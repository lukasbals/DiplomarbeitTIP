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
        MyService.prototype.getGeschaeftspartnerDetail = function (id) {
            var table = "geschaeftspartner_st";
            var string = '{"id": "' + id + '", "table": "' + table + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getGeschaeftspartnerDetail", json);
        };
        return MyService;
    })();
    TIP.MyService = MyService;
    angular
        .module("tip")
        .service("MyService", ["$http", MyService]);
})(TIP || (TIP = {}));
