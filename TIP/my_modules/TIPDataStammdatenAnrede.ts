var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");


var loadAnrede = function() {
  console.log("In TIPDataStammdatenAnrede -- loadAnrede");

  // makes anreden_st TABLE
  TIPDatabase.getDB().run("create table if not exists anreden_st (" +
    "code string(10) primary key, " +
    "bezeichnung string(80))");

  // GET request to the TIP server -- Anrede
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Anrede",
    (error, response, body: string): void => {
      var data: any[] = JSON.parse(body);

      TIPDatabase.getDB().serialize((): void => {
        var insertStmt = TIPDatabase.getDB().prepare("insert into anreden_st (code, bezeichnung) values (?, ?)");
        var updateStmt = TIPDatabase.getDB().prepare("update anreden_st set bezeichnung = ? where code = ?");

        var insertCount = 0;
        var updateCount = 0;

        data.forEach((val: any): void => {
          TIPDatabase.getDB().get("select count(*) as result from anreden_st where code = ?", [val.Code], (error, row): void => {
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
    var tblName: string = "anreden_st";
    TIPDatabase.setSYNCH(tblName);
}

module.exports.loadAnrede = loadAnrede;