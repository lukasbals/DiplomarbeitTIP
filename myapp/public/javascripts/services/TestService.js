var TIP;
(function (TIP) {
    var TestService = (function () {
        function TestService($http) {
            this.$http = $http;
        }
        TestService.prototype.getID = function (id) {
            if ((id == 1) || (id == 2)) {
                return this.$http.get("http://localhost:3000/dreier/" + id);
            }
            else {
                alert("Den Dreier gibt es nicht.");
            }
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
