var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterBesuchClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    // makes anreden_st TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists besuche (" +
        "client_id INTEGER PRIMARY KEY, " +
        "id int, " +
        "id_besuchstyp int, " +
        "client_id_besuch_plan int, " +
        "id_besuch_plan int, " +
        "id_geschaeftspartner int, " +
        "is_deleted int, " +
        "is_changed int, " +
        "von date, " +
        "bis date)");
    }

    // loads the TABLE anreden_st from the TIP Server
    loadTable(): void {
      console.log("In TIPDataVertreterBesuch -- loadVertreterBesuch");
      var date = new Date();

      // GET request to the TIP server -- Anrede
      request.get(
        "http://10.20.50.53/tip/" + "api/DM360/Vertreter/Besuch",
        (error, response, body: string): void => {
          var data: TIP.IBesuchModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into besuche (id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, is_deleted, is_changed, von, bis) values (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update besuche set id_besuchstyp = ?, client_id_besuch_plan = ?, id_besuch_plan = ?, id_geschaeftspartner = ?, is_deleted = ?, is_changed = ?, von = ?, bis = ? where id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from besuche where id = ?", [val.Id], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.IdBesuchstyp, val.ClientIdBesuchPlan, val.IdBesuchPlan, val.IdGeschaeftspartner, val.IsDeleted, val.IsChanged, val.Von, val.Bis, val.Id]);
                } else {
                  insertCount++;
                  insertStmt.run([val.Id, val.IdBesuchstyp, val.ClientIdBesuchPlan, val.IdBesuchPlan, val.IdGeschaeftspartner, val.IsDeleted, val.IsChanged, val.Von, val.Bis]);
                }
              });
            });

            if (insertCount > 0) {
              insertStmt.finalize();
            }
            if (updateCount > 0) {
              updateStmt.finalize();
            }
            this.isActive = false;
          });
        });

      // sets CURRENT_TIMESTAMP into synch_st TABLE
      var tblName: string = "besuche";
      TIPDatabase.setSYNCH(tblName, date);
    }

    isSyncActive(): boolean {
      return this.isActive;
    }

  }
}

module.exports = new TIP.TIPDataVertreterBesuchClass();
