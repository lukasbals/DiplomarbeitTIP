var TIP;
(function (TIP) {
    var PopUpBesuchPlanService = (function () {
        function PopUpBesuchPlanService($http) {
            this.$http = $http;
        }
        return PopUpBesuchPlanService;
    })();
    TIP.PopUpBesuchPlanService = PopUpBesuchPlanService;
    angular
        .module("tip")
        .service("PopUpBesuchPlanService", ["$http", PopUpBesuchPlanService]);
})(TIP || (TIP = {}));
