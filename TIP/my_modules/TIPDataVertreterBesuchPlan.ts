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
        "client_id int primary key, " +
        "id int, " +
        "client_id_tour_plan int, " +
        "id_tour_plan int, " +
        "id_geschaeftspartner int, " +
        "von date, " +
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
            var insertStmt = TIPDatabase.getDB().prepare("insert into besuche_plan (client_id, id, client_id_tour_plan, id_tour_plan, id_geschaeftspartner, von, bis, status) values (?, ?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update besuche_plan set id = ?, client_id_tour_plan = ?, id_tour_plan = ?, id_geschaeftspartner = ?, von = ?, bis = ?, status = ? where client_id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from besuche_plan where client_id = ?", [val.ClientId], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.Id, val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status, val.ClientId]);
                } else {
                  insertCount++;
                  insertStmt.run([val.ClientId, val.Id, val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status]);
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

    getJsonBesuchPlan(res): void  {
      var result: TIP.ISchedulerData[] = new Array();

      TIPDatabase.getDB().serialize((): void => {
        TIPDatabase.getDB().each("select gp.firmenbez_1, bp.von, bp.bis from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id;", (error, row): void => {
          result.push({
            text: row.firmenbez_1,
            startDate: row.von,
            endDate: row.bis
          });
        }, (): void => {
            //console.log(result);
            res.json(result);
          });
      });

    }

  }
}

module.exports = new TIP.TIPDataVertreterBesuchPlanClass();
