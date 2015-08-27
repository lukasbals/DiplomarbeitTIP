var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterBesuchClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    // makes besuche TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists besuche (" +
        "client_id INTEGER PRIMARY KEY, " +
        "id int, " +
        "id_besuchstyp int, " +
        "client_id_besuch_plan int, " +
        "id_besuch_plan int, " +
        "id_geschaeftspartner int, " +
        "is_deleted int, " +
        "is_changed int, " +
        "von date, " +
        "bis date)");
    }

    // loads the TABLE besuche from the TIP Server
    loadTable(): void {
      console.log("In TIPDataVertreterBesuch -- loadVertreterBesuch");
      var date = new Date();

      // GET request to the TIP server -- Besuch
      request.get("http://10.20.50.53/tip/api/DM360/Vertreter/Besuch", (error, response, body: string): void => {
        var data: TIP.IBesuchModel[] = JSON.parse(body);

        TIPDatabase.getDB().serialize((): void => {
          var insertStmt = TIPDatabase.getDB().prepare("insert into besuche (id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, is_deleted, is_changed, von, bis) values (?, ?, ?, ?, ?, ?, ?, ?, ?)");
          var updateStmt = TIPDatabase.getDB().prepare("update besuche set id_besuchstyp = ?, client_id_besuch_plan = ?, id_besuch_plan = ?, id_geschaeftspartner = ?, is_deleted = ?, is_changed = ?, von = ?, bis = ? where id = ?");

          var insertCount = 0;
          var updateCount = 0;

          data.forEach((val: any): void => {
            TIPDatabase.getDB().get("select count(*) as result from besuche where id = ?", [val.Id], (error, row): void => {
              if (row.result > 0) {
                updateCount++;
                updateStmt.run([val.IdBesuchstyp, val.ClientIdBesuch, val.IdBesuch, val.IdGeschaeftspartner, val.IsDeleted, val.IsChanged, val.Von, val.Bis, val.Id]);
              } else {
                insertCount++;
                insertStmt.run([val.Id, val.IdBesuchstyp, val.ClientIdBesuch, val.IdBesuch, val.IdGeschaeftspartner, val.IsDeleted, val.IsChanged, val.Von, val.Bis]);
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
      var tblName: string = "besuche";
      TIPDatabase.setSYNCH(tblName, date);
    }

    synchBesuch(res) {
      TIPDatabase.getDB().serialize((): void => {
        TIPDatabase.getDB().each("select client_id, id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, von, bis, is_deleted, is_changed from besuche where is_changed = 1 or is_deleted = 1;", (err, row): void => {
          var json: TIP.IBesuchModel[] = new Array();
          json.push({
            ClientId: row.client_id,
            Id: row.id,
            IdBesuchstyp: row.id_besuchstyp,
            ClientIdBesuchPlan: row.client_id_besuch_plan,
            IdBesuchPlan: row.id_besuch_plan,
            IdGeschaeftspartner: row.id_geschaeftspartner,
            Von: row.von,
            Bis: row.bis,
            IsDeleted: row.is_deleted,
            IsChanged: row.is_changed
          });
          console.log("Das ist eine ROW: --> ");
          console.log(json[0]);

          request.post({
            headers: { "content-type": "application/json" },
            url: "http://10.20.50.53/tip/api/DM360/Vertreter/Besuch",
            body: json[0],
            form: { key: 'value' }
          }, (err, res, req, body): void => {
              // var data: TIP.IBesuchModel[] = JSON.parse(body);
              console.log("Das ist ein BODY: --> ");
              //console.log(err);
              console.log(body);
            });

        });
      }, (): void => {
          res.send("OK");
        });
    }

    isSyncActive(): boolean {
      return this.isActive;
    }

    getJsonBesuch(res): void {
      var result: TIP.ISchedulerData[] = new Array();
      TIPDatabase.getDB().serialize((): void => {
        TIPDatabase.getDB().each("select gp.firmenbez_1, b.von, b.bis, b.client_id, b.id_geschaeftspartner, b.id from besuche b left join geschaeftspartner_st gp on b.id_geschaeftspartner = gp.id where is_deleted = 0;", (error, row): void => {
          result.push({
            text: row.firmenbez_1,
            startDate: row.von,
            endDate: row.bis,
            ClientId: row.client_id,
            IdGeschaeftspartner: row.id_geschaeftspartner,
            Id: row.id
          });
        }, (): void => {
            //console.log(result);
            res.json(result);
          });
      });
    }

    deleteBesuchAppointment(id: number, res): void {
      TIPDatabase.getDB().run("update besuche set is_deleted = 1 where client_id = ?;", [id], (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("OK");
        }
      });

    }

    updateBesuchAppointment(id: number, startDate: Date, endDate: Date, id_geschaeftspartner: number, id_besuchstyp: number, berichtHeadingContent: string, berichtContentContent: string, isOnServer: string, res): void {
      console.log("INTIP")
      var x = new Date(startDate.toLocaleString());
      var y = new Date(endDate.toLocaleString());
      var sD = x.toISOString();
      var eD = y.toISOString();
      // var IsDeleted: number = 0;
      // var IsChanged: number = 1;
      console.log(id);
      TIPDatabase.getDB().run("update besuche set is_changed = 1, von = " + startDate + ", bis = " + endDate + ", id_geschaeftspartner = " + id_geschaeftspartner + ", id_besuchstyp = " + id_besuchstyp + " where " + isOnServer + " = " + id + ";", (err): void => {
        console.log("HEADINGCONTENT" + berichtHeadingContent);
        if (berichtHeadingContent != "null") {
          console.log(id);
          TIPDatabase.getDB().run("insert into berichte (" + isOnServer + "_besuch, titel, text, is_changed, is_deleted) values (?, ?, ?, ? ,?)", [id, berichtHeadingContent, berichtContentContent, 1, 0]);
        } else {
          console.log("keinBericht");
        }
        console.log(err);
      });

      res.send("OK");
    }

    saveBesuchAppointment(startDate: Date, endDate: Date, id_geschaeftspartner: number, id_besuchstyp: number, berichtHeadingContent: string, berichtContentContent: string, res): void {
      var x = new Date(startDate.toLocaleString());
      var y = new Date(endDate.toLocaleString());
      var sD = x.toISOString();
      var eD = y.toISOString();
      var IsDeleted: number = 0;
      var IsChanged: number = 1;
      TIPDatabase.getDB().serialize((): void => {
        var stmt = TIPDatabase.getDB().prepare("insert into besuche (von, bis, id_geschaeftspartner, is_deleted, is_changed, id_besuchstyp) values (?, ?, ?, ?, ?, ?); select last_insert_rowid() from besuche;");
        stmt.run([sD, eD, id_geschaeftspartner, IsDeleted, IsChanged, id_besuchstyp], (): void => {
          var id = stmt.lastID;
          //console.log("HEADINGCONTENT" + berichtHeadingContent);
          if (berichtHeadingContent != "null") {
            TIPDatabase.getDB().run("insert into berichte (client_id_besuch, titel, text, is_changed, is_deleted) values (?, ?, ?, ? ,?)", [id, berichtHeadingContent, berichtContentContent, IsChanged, IsDeleted]);
          } else {
            console.log("keinBericht");
          }
        });

        stmt.finalize();
        res.send("OK");
      });
    }

    getDetailBesuch(id: number, res): void {
      var result: TIP.IBesuchDetailModel[] = new Array();
      console.log(id);
      TIPDatabase.getDB().serialize((): void => {
        //console.log("IN");
        TIPDatabase.getDB().each("select b.client_id, b.id, b.id_besuchstyp, b.client_id_besuch_plan, b.id_besuch_plan, b.id_geschaeftspartner, b.von, b.bis, b.is_deleted, b.is_changed, gp.gp_nummer, gp.code_gpkz, gp.firmenbez_1, gp.firmenbez_2, gp.firmenbez_3, gp.strasse, gp.code_land, gp.plz, gp.ort, gp.telefon, gp.fax, gp.email, gp.homepage, bt.bezeichnung from besuche b left join geschaeftspartner_st gp on b.id_geschaeftspartner = gp.id left join besuchstypen_st bt on b.id_besuchstyp = bt.id where b.client_id = ?;", [id], (err, row): void => {
          result.push({
            ClientId: row.client_id,
            Id: row.id,
            IdBesuchstyp: row.id_besuchstyp,
            ClientIdBesuchPlan: row.client_id_besuch_plan,
            IdBesuchPlan: row.id_besuch_plan,
            IdGeschaeftspartner: row.id_geschaeftspartner,
            startDate: row.von,
            endDate: row.bis,
            IsDeleted: row.is_deleted,
            IsChanged: row.is_changed,
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
            Bezeichnung: row.bezeichnung
          });
        }, (): void=> {
            console.log(result);
            res.json(result);
          });
      });
    }
  }
}

module.exports = new TIP.TIPDataVertreterBesuchClass();
