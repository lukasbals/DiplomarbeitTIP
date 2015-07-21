var TIP;
(function (TIP) {
    var MyService = (function () {
        function MyService($http) {
            this.$http = $http;
        }
        return MyService;
    })();
    TIP.MyService = MyService;
    angular
        .module("tip")
        .service("MyService", ["$http", MyService]);
})(TIP || (TIP = {}));
