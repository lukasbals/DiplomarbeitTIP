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
            var table = "geschaeftspartner_st";
            return this.getDetail(id, table);
        };
        MyService.prototype.getPersonDetail = function (id) {
            var table = "personen_st";
            return this.getDetail(id, table);
        };
        MyService.prototype.getDetail = function (id, table) {
            var string = '{"id": "' + id + '", "table": "' + table + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetail", json);
        };
        return MyService;
    })();
    TIP.MyService = MyService;
    angular
        .module("tip")
        .service("MyService", ["$http", MyService]);
})(TIP || (TIP = {}));
