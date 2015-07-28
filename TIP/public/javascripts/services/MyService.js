var TIP;
(function (TIP) {
    var MyService = (function () {
        function MyService($http) {
            this.$http = $http;
        }
        MyService.prototype.getGeschaeftspartner = function () {
            return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
        };
        MyService.prototype.getPerson = function () {
            return this.$http.get("http://localhost:3000/api/getJsonPerson");
        };
        MyService.prototype.postDetail = function (id) {
            return this.$http.get("http://localhost:3000/details?id=" + id);
        };
        return MyService;
    })();
    TIP.MyService = MyService;
    angular
        .module("tip")
        .service("MyService", ["$http", MyService]);
})(TIP || (TIP = {}));
