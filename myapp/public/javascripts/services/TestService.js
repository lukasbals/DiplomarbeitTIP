var TIP;
(function (TIP) {
    var TestService = (function () {
        function TestService($http) {
            this.$http = $http;
        }
        TestService.prototype.getID = function (id) {
            return this.$http.get("http://localhost:3000/users/" + id);
        };
        TestService.prototype.getData = function () {
            alert("In");
            var sqlite3 = require("sqlite3").verbose();
            var db = new sqlite3.Database("/balsDB.db");
            db.serialize(function () {
                db.each("SELECT rowid AS id, info FROM user_info", function (err, row) {
                    console.log(row.id + ": " + row.info);
                    alert(row.id + ": " + row.info);
                });
            });
            return;
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
