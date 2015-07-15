var TIP;
(function (TIP) {
    var TestService = (function () {
        function TestService($http) {
            this.$http = $http;
        }
        TestService.prototype.getID = function (id) {
            var eMsg = "Error";
            if ((id == 1) || (id == 2)) {
                alert("Die eingetippte Nummer ist: " + id);
                this.$http.get("http://localhost:3000/dreier/" + id)
                    .success(function (data) {
                    var data = data;
                    return data;
                }).
                    error(function (data) {
                    return eMsg;
                });
            }
            else {
                alert("Den Dreier gibt es nicht.");
                return eMsg;
            }
        };
        return TestService;
    })();
    TIP.TestService = TestService;
    angular
        .module("tip")
        .service("Test", ["$http", TestService]);
})(TIP || (TIP = {}));
