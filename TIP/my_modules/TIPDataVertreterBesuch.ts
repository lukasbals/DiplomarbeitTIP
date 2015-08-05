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
        "client_id int primary key, " +
        "id int, " +
        "id_besuchstyp int, " +
        "client_id_besuch_plan int, " +
        "id_besuch_plan int, " +
        "id_geschaeftspartner int, " +
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
          var data: TIP.IAnredeModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into besuche (client_id, id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, von, bis) values (?, ?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update besuche set id = ?, id_besuchstyp = ?, client_id_besuch_plan = ?, id_besuch_plan = ?, id_geschaeftspartner = ?, von = ?, bis = ? where client_id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from besuche where client_id = ?", [val.Code], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.Id, val.IdBesuchstyp, val.ClientIdBesuchPlan, val.IdBesuchPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.ClientId]);
                } else {
                  insertCount++;
                  insertStmt.run([val.ClientId, val.Id, val.IdBesuchstyp, val.ClientIdBesuchPlan, val.IdBesuchPlan, val.IdGeschaeftspartner, val.Von, val.Bis]);
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
