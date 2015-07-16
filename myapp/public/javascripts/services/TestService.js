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
            console.log("Hallo Chrome Console console!");
            return this.$http.get("http://localhost:3000/users/data");
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
