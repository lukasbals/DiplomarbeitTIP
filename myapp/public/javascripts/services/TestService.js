var TIP;
(function (TIP) {
    var TestService = (function () {
        function TestService($http) {
            this.$http = $http;
        }
        TestService.prototype.getID = function (id) {
            return this.$http.get("http://localhost:3000/dreier/" + id);
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
