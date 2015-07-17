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
            return this.$http.get("http://localhost:3000/users/data");
        };
        TestService.prototype.init = function () {
            return this.$http.get("http://localhost:3000/teams");
        };
        TestService.prototype.insertTeam = function (team, country) {
            var data = '{"team":"' + team + '","country":"' + country + '"}';
            var json = JSON.parse(data);
            return this.$http.post("http://localhost:3000/teams", json);
        };
        TestService.prototype.deleteTeam = function (id) {
            var idJson = '{"idDelete":' + id + '}';
            var json = JSON.parse(idJson);
            console.log(json);
            return this.$http.post("http://localhost:3000/delete", json);
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
