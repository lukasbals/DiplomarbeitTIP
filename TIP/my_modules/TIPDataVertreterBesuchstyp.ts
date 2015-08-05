var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterBesuchstypClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    //makes besuchstypen_st TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists besuchstypen_st (" +
        "id int primary key, " +
        "bezeichnung string(50));");
    }

    loadTable(): void {
      console.log("In TIPDataVertreterBesuchstyp -- loadBesuchstyp");
      var date = new Date();

      // GET request to the TIP server -- Besuchstyp
      request.get(
        "http://10.20.50.53/tip/" + "api/DM360/Vertreter/Besuchstyp",
        (error, response, body: string): void => {
          var data: TIP.IBesuchstypModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into besuchstypen_st (id, bezeichnung) values (?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update besuchstypen_st set bezeichnung = ? where id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from besuchstypen_st where id = ?", [val.Id], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.Bezeichnung, val.Id]);
                } else {
                  insertCount++;
                  insertStmt.run([val.Id, val.Bezeichnung]);
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
      var tblName: string = "besuchstypen_st";
      TIPDatabase.setSYNCH(tblName, date);

    }

    isSyncActive(): boolean {
      return this.isActive;
    }

  }
}

module.exports = new TIP.TIPDataVertreterBesuchstypClass();
