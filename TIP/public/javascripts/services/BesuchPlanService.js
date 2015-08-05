var TIP;
(function (TIP) {
    var BesuchPlanService = (function () {
        function BesuchPlanService($http) {
            this.$http = $http;
        }
        BesuchPlanService.prototype.getBesuchPlan = function () {
            return this.$http.get("http://localhost:3000/api/getJsonBesuchPlan");
        };
        return BesuchPlanService;
    })();
    TIP.BesuchPlanService = BesuchPlanService;
    angular
        .module("tip")
        .service("BesuchPlanService", ["$http", BesuchPlanService]);
})(TIP || (TIP = {}));
