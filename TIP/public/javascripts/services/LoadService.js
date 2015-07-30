var TIP;
(function (TIP) {
    var LoadService = (function () {
        function LoadService($http) {
            this.$http = $http;
        }
        LoadService.prototype.synchDB = function () {
            return this.$http.get("http://localhost:3000/api/synchDB");
        };
        return LoadService;
    })();
    TIP.LoadService = LoadService;
    angular
        .module("tip")
        .service("LoadService", ["$http", LoadService]);
})(TIP || (TIP = {}));
