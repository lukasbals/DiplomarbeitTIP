var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");

module TIP {
  export class TIPDataVertreterBerichtClass implements ITIPData {
    isActive: boolean = false;
    doSync(): void {
      this.isActive = true;
      this.initTable();
      this.loadTable();
    }

    // makes anreden_st TABLE
    initTable(): void {
      TIPDatabase.getDB().run("create table if not exists berichte (" +
        "client_id INTEGER PRIMARY KEY, " +
        "id int, " +
        "client_id_besuch int, " +
        "id_besuch int, " +
        "titel string(50), " +
        "is_deleted int, " +
        "is_changed int, " +
        "text TEXT)");
    }

    // loads the TABLE anreden_st from the TIP Server
    loadTable(): void {
      console.log("In TIPDataVertreterBericht -- loadVertreterBericht");
      var date = new Date();

      // GET request to the TIP server -- Anrede
      request.get(
        "http://10.20.50.53/tip/" + "api/DM360/Vertreter/Bericht",
        (error, response, body: string): void => {
          var data: TIP.IBerichtModel[] = JSON.parse(body);

          TIPDatabase.getDB().serialize((): void => {
            var insertStmt = TIPDatabase.getDB().prepare("insert into berichte (id, client_id_besuch, id_besuch, titel, is_deleted, is_changed, text) values (?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update berichte set client_id_besuch = ?, id_besuch = ?, titel = ?, is_deleted = ?, is_changed = ?, text = ? where id = ?");

            var insertCount = 0;
            var updateCount = 0;

            data.forEach((val: any): void => {
              TIPDatabase.getDB().get("select count(*) as result from berichte where id = ?", [val.Id], (error, row): void => {
                if (row.result > 0) {
                  updateCount++;
                  updateStmt.run([val.ClientIdBesuch, val.IdBesuch, val.Titel, val.IsDeleted, val.IsChanged, val.Text, val.Id]);
                } else {
                  insertCount++;
                  insertStmt.run([val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.IsDeleted, val.IsChanged, val.Text]);
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
      var tblName: string = "berichte";
      TIPDatabase.setSYNCH(tblName, date);
    }

    isSyncActive(): boolean {
      return this.isActive;
    }

    getBerichtById(id: number, isOnServer: string, res): void {
      var result: TIP.IBerichtModel[] = new Array();
      console.log(id);
      TIPDatabase.getDB().serialize((): void => {
        console.log(isOnServer);
        TIPDatabase.getDB().each("select client_id, id, client_id_besuch, id_besuch, titel, text, is_deleted, is_changed from berichte where " + isOnServer + " = " + id + " and is_deleted = 0;", (err, row): void => {
          result.push({
            ClientId: row.client_id,
            Id: row.id,
            ClientIdBesuch: row.client_id_besuch,
            IdBesuch: row.id_besuch,
            Titel: row.titel,
            Text: row.text,
            IsDeleted: row.is_deleted,
            IsChanged: row.is_changed
          });
        }, (): void=> {
            console.log(result);
            res.json(result);
          });
      });
    }

    updateBericht(dataSourceBericht: JSON, res): void {
      for (var i = 0; i < dataSourceBericht.length; i++) {
        var obj = dataSourceBericht[i];
          console.log(dataSourceBericht[i].Text);
          TIPDatabase.getDB().run("update berichte set titel = ?, text = ?, is_changed = 1 where client_id = ?", [dataSourceBericht[i].Titel, dataSourceBericht[i].Text, dataSourceBericht[i].ClientId], (err, row): void => {
            if (err) {
              console.log(err);
            }
          });
      }
      res.send("OK");
    }

    deleteBericht(ClientId: number, res): void {
      TIPDatabase.getDB().run("update berichte set is_deleted = 1 where client_id = ?", [ClientId], (err): void => {
        if (err){
          console.log(err);
        } else {
          res.send("OK");
        }
      });
    }
  }
}

module.exports = new TIP.TIPDataVertreterBerichtClass();
