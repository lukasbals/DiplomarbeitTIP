var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIPInterface = require("../my_modules/TIPInterface");

// makes geschaeftspartner_st TABLE
var initTableGeschaeftspartner = (): void => {
  TIPInterface.syncCount = TIPInterface.syncCount + 1;
  TIPDatabase.getDB().run("create table if not exists geschaeftspartner_st ( " +
    "id integer primary key asc, " +
    "gp_nummer integer, " +
    "code_gpkz text, " +
    "firmenbez_1 text, " +
    "firmenbez_2 text, " +
    "firmenbez_3 text, " +
    "strasse text, " +
    "code_land text, " +
    "plz text, " +
    "ort text, " +
    "telefon text, " +
    "fax text, " +
    "email text, " +
    "homepage text)");
}

// loads the TABLE geschaeftspartner_st from the TIP Server
var loadGeschaeftspartner = (): void => {
  console.log("In TIPDataStammdatenGeschaeftspartner -- loadGeschaeftspartner");
  var date = new Date();

  // GET request to the TIP server -- Geschaeftspartner
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Geschaeftspartner",
    (error, response, body: string): void => {
      var data: TIP.IGpStammModel[] = JSON.parse(body);

      TIPDatabase.getDB().serialize((): void => {
        var insertStmt = TIPDatabase.getDB().prepare("insert into geschaeftspartner_st (id, gp_nummer, code_gpkz, firmenbez_1, firmenbez_2, firmenbez_3, strasse, code_land, plz, ort, telefon, fax, email, homepage) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        var updateStmt = TIPDatabase.getDB().prepare("update geschaeftspartner_st set gp_nummer = ?, code_gpkz = ?, firmenbez_1 = ?, firmenbez_2 = ?, firmenbez_3 = ?, strasse = ?, code_land = ?, plz = ?, ort = ?, telefon = ?, fax = ?, email = ?, homepage = ? where id = ?");

        var insertCount = 0;
        var updateCount = 0;


        data.forEach((val: any): void => {
          TIPDatabase.getDB().get("select count(*) as result from geschaeftspartner_st where id = ?", [val.Id], (error, row): void => {
            if (row.result > 0) {
              updateCount++;
              updateStmt.run([val.GpNummer, val.CodeGpKz, val.Firmenbez1, val.Firmenbez2, val.Firmenbez3, val.Strasse, val.CodeLand, val.Plz, val.Ort, val.Telefon, val.Fax, val.Email, val.Homepage, val.Id]);
            } else {
              insertCount++;
              insertStmt.run([val.Id, val.GpNummer, val.CodeGpKz, val.Firmenbez1, val.Firmenbez2, val.Firmenbez3, val.Strasse, val.CodeLand, val.Plz, val.Ort, val.Telefon, val.Fax, val.Email, val.Homepage]);
            }
          });
        });

        if (insertCount > 0) {
          insertStmt.finalize();
          TIPInterface.syncCount = TIPInterface.syncCount - 1;
        }
        if (updateCount > 0) {
          updateStmt.finalize();
          TIPInterface.syncCount = TIPInterface.syncCount - 1;
        }
      });
    });

  // sets CURRENT_TIMESTAMP into synch_st TABLE
  var tblName: string = "geschaeftspartner_st";
  TIPDatabase.setSYNCH(tblName, date);
}

var getJsonGeschaeftspartner = (res): void => {
  var result: TIP.IGpStammModel[] = new Array();

  TIPDatabase.getDB().serialize((): void => {
    TIPDatabase.getDB().each("select id, gp_nummer, code_gpkz, firmenbez_1, firmenbez_2, firmenbez_3, strasse, code_land, plz, ort, telefon, fax, email, homepage from geschaeftspartner_st;", (error, row): void => {
      result.push({
        Id: row.id,
        GpNummer: row.gp_nummer,
        CodeGpKz: row.code_gpkz,
        Firmenbez1: row.firmenbez_1,
        Firmenbez2: row.firmenbez_2,
        Firmenbez3: row.firmenbez_3,
        Strasse: row.strasse,
        CodeLand: row.code_land,
        Plz: row.plz,
        Ort: row.ort,
        Telefon: row.telefon,
        Fax: row.fax,
        Email: row.email,
        Homepage: row.homepage
      });
    }, (): void => {
        //console.log(result);
        res.json(result);
      });
  });
}

//
// get Detail for geschaeftspartner_st table
//
var getDetailGeschaeftspartner = (id: number, res): void => {
  var result: TIP.IGpDetailModel[] = new Array();
  TIPDatabase.getDB().serialize((): void => {

    TIPDatabase.getDB().each("select g.code_land, g.code_gpkz, g.id, l.bezeichnung as land, gp.bezeichnung as gpkz, g.email, g.fax, g.firmenbez_1, g.firmenbez_2, g.firmenbez_3, g.gp_nummer, g.homepage, l.is_eu, g.ort, g.plz, g.strasse, g.telefon from geschaeftspartner_st g left join laender_st l on g.code_land = l.code left join gpkz_st gp on g.code_gpkz = gp.code where g.id =?;", [id], (err, row): void => {
      //console.log(req);
      result.push({
        Id: row.id,
        GpNummer: row.gp_nummer,
        CodeGpKz: row.code_gpkz,
        Firmenbez1: row.firmenbez_1,
        Firmenbez2: row.firmenbez_2,
        Firmenbez3: row.firmenbez_3,
        Strasse: row.strasse,
        CodeLand: row.code_land,
        Plz: row.plz,
        Ort: row.ort,
        Telefon: row.telefon,
        Fax: row.fax,
        Email: row.email,
        Homepage: row.homepage,
        Land: row.land,
        GpKz: row.gpkz,
        IsEU: row.is_eu
      })
    }, (): void=> {
        res.json(result);
      });
  });
}

//
// get Detail for geschaeftspartner_st table
//
var getDetailGeschaeftspartnerForPerson = (id: number, res): void => {
  var result: TIP.IGpDetailModel[] = new Array();
  TIPDatabase.getDB().serialize((): void => {

    TIPDatabase.getDB().get("select id_geschaeftspartner from personen_st where id = ?", [id], (err, row): void => {
      var idGP: number = row.id_geschaeftspartner;
      //console.log(res.id_geschaeftspartner);
      //console.log(idGP);

      TIPDatabase.getDB().each("select g.code_land, g.code_gpkz, g.id, l.bezeichnung as land, gp.bezeichnung as gpkz, g.email, g.fax, g.firmenbez_1, g.firmenbez_2, g.firmenbez_3, g.gp_nummer, g.homepage, l.is_eu, g.ort, g.plz, g.strasse, g.telefon from geschaeftspartner_st g left join laender_st l on g.code_land = l.code left join gpkz_st gp on g.code_gpkz = gp.code where g.id =?;", [idGP], (err, row): void => {
        //console.log(req);
        result.push({
          Id: row.id,
          GpNummer: row.gp_nummer,
          CodeGpKz: row.code_gpkz,
          Firmenbez1: row.firmenbez_1,
          Firmenbez2: row.firmenbez_2,
          Firmenbez3: row.firmenbez_3,
          Strasse: row.strasse,
          CodeLand: row.code_land,
          Plz: row.plz,
          Ort: row.ort,
          Telefon: row.telefon,
          Fax: row.fax,
          Email: row.email,
          Homepage: row.homepage,
          Land: row.land,
          GpKz: row.gpkz,
          IsEU: row.is_eu
        });
      }, (): void=> {
          res.json(result);
          //console.log(result);
        });
    });
  });
}
module.exports.initTableGeschaeftspartner = initTableGeschaeftspartner;
module.exports.loadGeschaeftspartner = loadGeschaeftspartner;
module.exports.getJsonGeschaeftspartner = getJsonGeschaeftspartner;
module.exports.getDetailGeschaeftspartner = getDetailGeschaeftspartner;
module.exports.getDetailGeschaeftspartnerForPerson = getDetailGeschaeftspartnerForPerson;
