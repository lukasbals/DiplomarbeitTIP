var TIP;
(function (TIP) {
    var TestService = (function () {
        function TestService($http) {
            this.$http = $http;
        }
        TestService.prototype.getProduct = function (id) {
            return this.$http.get("www.url.com");
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular.module("tip").service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));