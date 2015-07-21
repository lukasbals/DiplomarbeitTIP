var TIP;
(function (TIP) {
    var IService = (function () {
        function IService($http) {
            this.$http = $http;
        }
        return IService;
    })();
    TIP.IService = IService;
    angular
        .module("tip")
        .service("IService", ["$http", IService]);
})(TIP || (TIP = {}));
