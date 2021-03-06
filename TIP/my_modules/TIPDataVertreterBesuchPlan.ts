var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterBesuchPlanClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    // makes anreden_st TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists besuche_plan (" +
        "client_id INTEGER PRIMARY KEY, " +
        "id int, " +
        "client_id_tour_plan int, " +
        "id_tour_plan int, " +
        "id_geschaeftspartner int, " +
        "von date, " +
        "is_deleted int, " +
        "is_changed int, " +
        "bis date, " +
        "status int);");
    }

    // loads the TABLE anreden_st from the TIP Server
    loadTable(): void {
      console.log("In TIPDataVertreterBesuchPlan -- loadVertreterBesuchPlan");
      var date = new Date();

      // GET request to the TIP server -- Anrede
      request.get(
        "http://10.20.50.53/tip/" + "api/DM360/Vertreter/BesuchPlan",
        (error, response, body: string): void => {
          var data: TIP.IBesuchPlanModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into besuche_plan (id, client_id_tour_plan, id_tour_plan, id_geschaeftspartner, von, bis, status, is_deleted, is_changed) values (?, ?, ?, ?, ?, ?, ?, ? ,?)");
            var updateStmt = TIPDatabase.getDB().prepare("update besuche_plan set client_id_tour_plan = ?, id_tour_plan = ?, id_geschaeftspartner = ?, von = ?, bis = ?, status = ? , is_deleted = ?, is_changed = ? where id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from besuche_plan where id = ?", [val.Id], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status, val.IsDeleted, val.IsChanged, val.Id]);
                } else {
                  insertCount++;
                  insertStmt.run([val.Id, val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status, val.IsDeleted, val.IsChanged]);
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
      var tblName: string = "besuche_plan";
      TIPDatabase.setSYNCH(tblName, date);
    }

    isSyncActive(): boolean {
      return this.isActive;
    }

    getJsonBesuchPlan(res): void {
      var result: TIP.ISchedulerData[] = new Array();

      TIPDatabase.getDB().serialize((): void => {
        TIPDatabase.getDB().each("select gp.firmenbez_1, bp.id, bp.von, bp.bis, bp.client_id, bp.id_geschaeftspartner from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id where is_deleted = 0;", (error, row): void => {
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

    deleteBesuchPlanAppointment(id: number, res): void {
      TIPDatabase.getDB().run("update besuche_plan set is_deleted = 1 where client_id = ?;", [id], (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("OK");
        }
      });
    }

    updateBesuchPlanAppointment(updateBesuchPlanAppointmentData: IUpdateBesuchPlanAppointmentModel, res): void {
      var data: IUpdateBesuchPlanAppointmentModel = updateBesuchPlanAppointmentData;
      var x = new Date(data.startDate.toLocaleString());
      var y = new Date(data.endDate.toLocaleString());
      var sD = x.toISOString();
      var eD = y.toISOString();
      TIPDatabase.getDB().run("update besuche_plan set is_changed = 1, von = ?, bis = ?, id_geschaeftspartner = ? where client_id = ?;", [sD, eD, data.IdGeschaeftspartner, data.ClientId], (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("OK");
        }
      });
    }

    saveBesuchPlanAppointment(saveBesuchPlanAppointmentData, res): void {
      var data: ISaveBesuchPlanAppointmentModel = saveBesuchPlanAppointmentData;
      var x = new Date(data.startDate.toLocaleString());
      var y = new Date(data.endDate.toLocaleString());
      var sD = x.toISOString();
      var eD = y.toISOString();
      var IsDeleted: number = 0;
      var IsChanged: number = 1;
      var Status: number = 1;
      TIPDatabase.getDB().run("insert into besuche_plan (von, bis, id_geschaeftspartner, is_deleted, is_changed,status) values (?, ?, ?, ?, ?, ?);", [sD, eD, data.IdGeschaeftspartner, IsDeleted, IsChanged, Status], (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send("OK");
        }
      });

    }

    getDetailBesuchPlan(id: number, res): void {
      var result: TIP.IBesuchPlanDetailModel[] = new Array();
      console.log(id);
      TIPDatabase.getDB().serialize((): void => {
        //console.log("IN");
        TIPDatabase.getDB().each("select bp.client_id, bp.id, bp.id_tour_plan, bp.client_id_tour_plan, bp.id_geschaeftspartner, bp.von, bp.bis, bp.status, bp.is_deleted, bp.is_changed, gp.gp_nummer, gp.code_gpkz, gp.firmenbez_1, gp.firmenbez_2, gp.firmenbez_3, gp.strasse, gp.code_land, gp.plz, gp.ort, gp.telefon, gp.fax, gp.email, gp.homepage from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id where bp.client_id = ?;", [id], (err, row): void => {
          result.push({
            ClientId: row.client_id,
            Id: row.id,
            IdTourPlan: row.id_tour_plan,
            ClientIdTourPlan: row.client_id_tour_plan,
            IdGeschaeftspartner: row.id_geschaeftspartner,
            startDate: row.von,
            endDate: row.bis,
            Status: row.status,
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
            Homepage: row.homepage
          });
        }, (): void=> {
            console.log(result);
            res.json(result);
          });
      });
    }
  }
}

module.exports = new TIP.TIPDataVertreterBesuchPlanClass();
