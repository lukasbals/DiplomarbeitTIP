var TIP;
(function (TIP) {
    var GeschaeftspartnerService = (function () {
        function GeschaeftspartnerService($http) {
            this.$http = $http;
        }
        GeschaeftspartnerService.prototype.getGeschaeftspartner = function () {
            return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
        };
        GeschaeftspartnerService.prototype.getDetailGeschaeftspartner = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetailGeschaeftspartner", json);
        };
        GeschaeftspartnerService.prototype.getDetailPersonForGP = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetailPersonForGP", json);
        };
        return GeschaeftspartnerService;
    })();
    TIP.GeschaeftspartnerService = GeschaeftspartnerService;
    angular
        .module("tip")
        .service("GeschaeftspartnerService", ["$http", GeschaeftspartnerService]);
})(TIP || (TIP = {}));
