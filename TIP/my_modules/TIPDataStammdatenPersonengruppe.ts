var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

var loadPersonengruppe = function() {
  console.log("In TIPDataStammdatenPersonenGruppe -- loadPersonengruppe");

  // makes personengruppe_st TABLE
  TIPDatabase.getDB().run("create table if not exists personengruppen_st (" +
    "code string(2) primary key, " +
    "bezeichnung string(50))");

  // GET request to the TIP server -- Persoenengruppe
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Personengruppe",
    (error, response, body: string): void => {
      var data: any[] = JSON.parse(body);

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
    TIPDatabase.setSYNCH(tblName);
}

module.exports.loadPersonengruppe = loadPersonengruppe;
