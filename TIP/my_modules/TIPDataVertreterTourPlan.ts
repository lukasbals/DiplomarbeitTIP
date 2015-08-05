var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterTourPlanClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      console.log("IN");
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    //makes besuchstypen_st TABLE
    initTable(): void {
      console.log("IN");
      TIPDatabase.getDB().run("create table if not exists touren_plan (" +
      "client_id int primary key, " +
      "id int," +
      "tour_name string(50)," +
      "von date," +
      "bis date);");
    }

    loadTable(): void {
      console.log("In TIPDataVertreterBesuchstyp -- loadTourPlan");
      var date = new Date();

      // GET request to the TIP server -- Besuchstyp
      request.get(
        "http://10.20.50.53/tip/" + "api/DM360/Vertreter/TourPlan",
        (error, response, body: string): void => {
          var data: TIP.ITourPlanModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into touren_plan (client_id, id, tour_name, von, bis) values (?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update touren_plan set id = ?, tour_name = ?, von = ?, bis = ? where client_id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from touren_plan where client_id = ?", [val.ClientId], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.Id, val.TourName, val.Von, val.Bis, val.ClientId]);
                } else {
                  insertCount++;
                  insertStmt.run([val.ClientId, val.Id, val.TourName, val.Von, val.Bis]);
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
      var tblName: string = "touren_plan";
      TIPDatabase.setSYNCH(tblName, date);

    }

    isSyncActive(): boolean {
      return this.isActive;
    }


  }
}

module.exports = new TIP.TIPDataVertreterTourPlanClass();
