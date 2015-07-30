var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

  // makes personen_st TABLE
var initTablePerson = (): void => {
    TIPDatabase.getDB().run("create table if not exists personen_st ( " +
      "id int primary key, " +
      "id_geschaeftspartner int, " +
      "code_gruppe string(2), " +
      "code_anrede string(10), " +
      "titel string(50), " +
      "vorname string(50), " +
      "nachname string(50), " +
      "abteilung string(50), " +
      "telefon string(50), " +
      "mobil string(50), " +
      "fax string(50), " +
      "email string(50), " +
      "geburtsdatum date)");
}

// loads the TABLE personen_st from the TIP Server
var loadPerson = (): void => {
  console.log("In TIPDataStammdatenPerson -- loadPerson");
  var date = new Date();

  // GET request to the TIP server -- Person
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Person",
    (error, response, body: string): void => {
      var data: TIP.IPersonModel[] = JSON.parse(body);

      TIPDatabase.getDB().serialize((): void => {
        var insertStmt = TIPDatabase.getDB().prepare("insert into personen_st (id, id_geschaeftspartner, code_gruppe, code_anrede, titel, vorname, nachname, abteilung, telefon, mobil, fax, email, geburtsdatum) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        var updateStmt = TIPDatabase.getDB().prepare("update personen_st set id_geschaeftspartner = ?, code_gruppe = ?, code_anrede = ?, titel = ?, vorname = ?, nachname = ?, abteilung = ?, telefon = ?, mobil = ?, fax = ?, email = ?, geburtsdatum = ? where id = ?");

        var insertCount = 0;
        var updateCount = 0;

        data.forEach((val: any): void => {
          TIPDatabase.getDB().get("select count(*) as result from personen_st where id = ?", [val.Id], (error, row): void => {
            if (row.result > 0) {
              updateCount++;
              updateStmt.run([val.IdGeschaeftspartner, val.CodePersonengruppe, val.CodeAnrede, val.Titel, val.Vorname, val.Nachname, val.Abteilung, val.Telefon, val.Mobil, val.Fax, val.Email, val.Geburtsdatum, val.Id]);
            } else {
              insertCount++;
              insertStmt.run([val.Id, val.IdGeschaeftspartner, val.CodePersonengruppe, val.CodeAnrede, val.Titel, val.Vorname, val.Nachname, val.Abteilung, val.Telefon, val.Mobil, val.Fax, val.Email, val.Geburtsdatum]);
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
  var tblName: string = "personen_st";
  TIPDatabase.setSYNCH(tblName, date);
}

var getJsonPerson = (res): void => {
  var result = new Array();

  TIPDatabase.getDB().serialize((): void => {
    TIPDatabase.getDB().each("select id, id_geschaeftspartner, code_gruppe, code_anrede, titel, vorname, nachname, abteilung, telefon, mobil, fax, email, geburtsdatum from personen_st;", (error, row): void => {
      result.push({
        Id: row.id,
        IdGeschaeftspartner: row.id_geschaeftspartner,
        CodePersonengruppe: row.code_gruppe,
        CodeAnrede: row.code_anrede,
        Titel: row.titel,
        Vorname: row.vorname,
        Nachname: row.nachname,
        Abteilung: row.abteilung,
        Telefon: row.telefon,
        Mobil: row.mobil,
        Fax: row.fax,
        Email: row.email,
        Geburtsdatum: row.Geburtsdatum
      });
    }, (): void => {
        //console.log(result);
        res.json(result);
      });
  });
}

//
// get Detail for personen_st table
//
var getDetailPerson = (id: number, res): void =>{
  TIPDatabase.getDB().serialize((): void => {

    //console.log(tblName);
    TIPDatabase.getDB().all("select gp.id as id_geschaeftspartner, p.abteilung, a.bezeichnung as anrede, pg.bezeichnung as personengruppen, p.email, p.fax, gp.firmenbez_1, p.mobil, p.vorname, p.nachname, p.telefon, p.titel from personen_st p inner join geschaeftspartner_st gp on p.id_geschaeftspartner = gp.id inner join personengruppen_st pg on p.code_gruppe = pg.code inner join anreden_st a on p.code_anrede = a.code where p.id =" + id + ";", (err, req): void => {
      //console.log(req);
      if (req != null) {
        res.send(req);
        console.log(req);
      } else {
        console.log("Es ist ein Fehler aufgetreten.")
      }

    });
  });
}

module.exports.initTablePerson = initTablePerson;
module.exports.loadPerson = loadPerson;
module.exports.getJsonPerson = getJsonPerson;
module.exports.getDetailPerson = getDetailPerson;
