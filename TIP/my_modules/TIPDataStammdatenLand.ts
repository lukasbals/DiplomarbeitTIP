var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIPInterface = require("../my_modules/TIPInterface");

// makes laender_st TABLE
var initTableLand = (): void => {
  TIPInterface.syncCount = TIPInterface.syncCount + 1;
  TIPDatabase.getDB().run("create table if not exists laender_st (" +
    "code string(3) primary key, " +
    "bezeichnung string(30), " +
    "is_eu boolean)");
}

// loads the TABLE laender_st from the TIP Server
var loadLand = (): void => {
  console.log("In TIPDataStammdatenLand -- loadLand");
  var date = new Date();

  // GET request to the TIP server -- Land
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Land",
    (error, response, body: string): void => {
      var data: TIP.ILandModel[] = JSON.parse(body);

      TIPDatabase.getDB().serialize((): void => {
        var insertStmt = TIPDatabase.getDB().prepare("insert into laender_st (code, bezeichnung, is_eu) values (?, ?, ?)");
        var updateStmt = TIPDatabase.getDB().prepare("update laender_st set bezeichnung = ?, is_eu = ? where code = ?");

        var insertCount = 0;
        var updateCount = 0;

        data.forEach((val: any): void => {
          TIPDatabase.getDB().get("select count(*) as result from laender_st where code = ?", [val.Code], (error, row): void => {
            if (row.result > 0) {
              updateCount++;
              updateStmt.run([val.Bezeichnung, val.IsEU, val.Code]);
            } else {
              insertCount++;
              insertStmt.run([val.Code, val.Bezeichnung, val.IsEU]);
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
  var tblName: string = "laender_st";
  TIPDatabase.setSYNCH(tblName, date);
}

var getJsonLand = (res): void => {
  var result = new Array();

  TIPDatabase.getDB().serialize((): void => {
    TIPDatabase.getDB().each("select code, bezeichnung, is_eu from laender_st;", (error, row): void => {
      result.push({
        Code: row.code,
        Bezeichnung: row.bezeichnung,
        IsEU: row.is_eu
      });
    }, (): void => {
        //console.log(result);
        res.json(result);
      });
  });
}

module.exports.initTableLand = initTableLand;
module.exports.loadLand = loadLand;
module.exports.getJsonLand = getJsonLand;
