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
        "client_id int primary key, " +
        "id int, " +
        "client_id_besuch int, " +
        "id_besuch int, " +
        "titel string(50), " +
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
          var data: TIP.IAnredeModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into berichte (client_id, id, client_id_besuch, id_besuch, titel, text) values (?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update berichte set id = ?, client_id_besuch = ?, id_besuch = ?, titel = ?, text = ? where client_id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from berichte where client_id = ?", [val.Code], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.Text, val.ClientId]);
                } else {
                  insertCount++;
                  insertStmt.run([val.ClientId, val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.Text]);
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
