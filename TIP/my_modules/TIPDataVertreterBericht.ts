var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterBerichtClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    // makes anreden_st TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists berichte (" +
        "client_id INTEGER PRIMARY KEY, " +
        "id int, " +
        "client_id_besuch int, " +
        "id_besuch int, " +
        "titel string(50), " +
        "is_deleted int, " +
        "is_changed int, " +
        "text TEXT)");
    }

    // loads the TABLE anreden_st from the TIP Server
    loadTable(): void {
      console.log("In TIPDataVertreterBericht -- loadVertreterBericht");
      var date = new Date();

      // GET request to the TIP server -- Anrede
      request.get(
        "http://10.20.50.53/tip/" + "api/DM360/Vertreter/Bericht",
        (error, response, body: string): void => {
          var data: TIP.IBerichtModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into berichte (id, client_id_besuch, id_besuch, titel, is_deleted, is_changed, text) values (?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update berichte set client_id_besuch = ?, id_besuch = ?, titel = ?, is_deleted = ?, is_changed = ?, text = ? where id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from berichte where id = ?", [val.Id], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.ClientIdBesuch, val.IdBesuch, val.Titel, val.IsDeleted, val.IsChanged, val.Text, val.Id]);
                } else {
                  insertCount++;
                  insertStmt.run([val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.IsDeleted, val.IsChanged, val.Text]);
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
      var tblName: string = "berichte";
      TIPDatabase.setSYNCH(tblName, date);
    }

    isSyncActive(): boolean {
      return this.isActive;
    }
  }
}

module.exports = new TIP.TIPDataVertreterBerichtClass();
