var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP  {
  export class TIPDataStammdatenPersonengruppe implements ITIPData {
    doSync(): void {
      this.initTablePersonengruppe();
      this.loadPersonengruppe();
    }

    isSyncActive(): boolean {
      return null;
    }
    // makes personengruppe_st TABLE
    initTablePersonengruppe(): void {
      TIPDatabase.getDB().run("create table if not exists personengruppen_st (" +
        "code string(2) primary key, " +
        "bezeichnung string(50))");
    }

    // loads the TABLE personengruppen_st from the TIP Server
    loadPersonengruppe(): void {
      console.log("In TIPDataStammdatenPersonenGruppe -- loadPersonengruppe");
      var date = new Date();



      // GET request to the TIP server -- Persoenengruppe
      request.get(
        "http://10.20.50.53/tip/api/DM360/Stammdaten/Personengruppe",
        (error, response, body: string): void => {
          var data: TIP.IPersonengruppeModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into personengruppen_st (code, bezeichnung) values (?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update personengruppen_st set bezeichnung = ? where code = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from personengruppen_st where code = ?", [val.Code], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.Bezeichnung, val.Code]);
                } else {
                  insertCount++;
                  insertStmt.run([val.Code, val.Bezeichnung]);
                }
              });
            });

            if (insertCount > 0) {
              insertStmt.finalize();
            }
            if (updateCount > 0) {
              updateStmt.finalize();
            }
          });
        });

      // sets CURRENT_TIMESTAMP into synch_st TABLE
      var tblName: string = "personengruppen_st";
      TIPDatabase.setSYNCH(tblName, date);
    }

    getJsonPersonengruppe(res): void {
      var result = new Array();

      TIPDatabase.getDB().serialize((): void => {
        TIPDatabase.getDB().each("select code, bezeichnung from personengruppen_st;", (error, row): void => {
          result.push({
            Code: row.code,
            Bezeichnung: row.bezeichnung,
          });
        }, (): void => {
            //console.log(result);
            res.json(result);
          });
      });
    }

  }
}

module.exports = new TIP.TIPDataStammdatenPersonengruppe();
