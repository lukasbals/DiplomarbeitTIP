var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataStammdatenGpKzClass implements ITIPData  {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    // makes gpkz_st TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists gpkz_st (" +
        "code string(2) primary key, " +
        "bezeichnung string(30))");
    }

    // loads the TABLE gpkz_st from the TIP Server
    loadTable(): void {
      console.log("In TIPDataStammdatenGpKz -- loadGpKz");
      var date = new Date();

      // GET request to the TIP server -- GpKz
      request.get(
        "http://10.20.50.53/tip/api/DM360/Stammdaten/GpKz",
        (error, response, body: string): void => {
          var data: TIP.IGpKzModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into gpkz_st (code, bezeichnung) values (?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update gpkz_st set bezeichnung = ? where code = ?");

            var insertCount = 0;
            var updateCount = 0;


            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from gpkz_st where code = ?", [val.Code], (error, row): void => {
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
            this.isActive = false;
          });
        });

      // sets CURRENT_TIMESTAMP into synch_st TABLE
      var tblName: string = "gpkz_st";
      TIPDatabase.setSYNCH(tblName, date);
    }

    isSyncActive(): boolean {
      return this.isActive;
    }

    getJsonGpKz(res): void {
      var result: TIP.IGpKzModel[] = new Array();
      TIPDatabase.getDB().serialize((): void => {
        TIPDatabase.getDB().each("select code, bezeichnung from anreden_st;", (error, row): void => {
          result.push({
            Code: row.code,
            Bezeichnung: row.bezeichnung
          });
        }, (): void => {
            //console.log(result);
            res.json(result);
          });
      });
    }
  }
}


module.exports = new TIP.TIPDataStammdatenGpKzClass();
