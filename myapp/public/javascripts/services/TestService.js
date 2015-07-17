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
            console.log("Hallo Chrome Console!");
            return this.$http.get("http://localhost:3000/users/data");
        };
        TestService.prototype.insertTeam = function (team, country) {
            var data = '{"team":"' + team + '","country":"' + country + '"}';
            var json = JSON.parse(data);
            return this.$http.post("http://localhost:3000/teams", json);
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
