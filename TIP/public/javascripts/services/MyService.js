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
        MyService.prototype.synchDB = function () {
            return this.$http.get("http://localhost:3000/api/synchDB");
        };
        MyService.prototype.getGeschaeftspartnerDetail = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetailGeschaeftspartner", json);
        };
        return MyService;
    })();
    TIP.MyService = MyService;
    angular
        .module("tip")
        .service("MyService", ["$http", MyService]);
})(TIP || (TIP = {}));
