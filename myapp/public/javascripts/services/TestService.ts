module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }
    getID(id: string): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/users/" + id);

    }

    getData(): JSON {
      alert("In");
      var sqlite3 = require("sqlite3").verbose();
      var db = new sqlite3.Database("/balsDB.db");
      db.serialize(function() {
        db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
            console.log(row.id + ": " + row.info);
            alert(row.id + ": " + row.info);
        });
      });

      return
    }
  }
  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
