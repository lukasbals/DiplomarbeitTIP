var TIP;
(function (TIP) {
    var LoadService = (function () {
        function LoadService($http) {
            this.$http = $http;
        }
        LoadService.prototype.synchDB = function () {
            return this.$http.get("http://localhost:3000/api/synchDB");
        };
        LoadService.prototype.getIsSyncActive = function () {
            return this.$http.get("http://localhost:3000/api/isSyncActive");
        };
        return LoadService;
    })();
    TIP.LoadService = LoadService;
    angular
        .module("tip")
        .service("LoadService", ["$http", LoadService]);
})(TIP || (TIP = {}));
