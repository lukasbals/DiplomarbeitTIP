var TIP;
(function (TIP) {
    var PopUpBesuchPlanViewModel = (function () {
        function PopUpBesuchPlanViewModel(PopUpBesuchPlan) {
            this.PopUpBesuchPlan = PopUpBesuchPlan;
        }
        return PopUpBesuchPlanViewModel;
    })();
    TIP.PopUpBesuchPlanViewModel = PopUpBesuchPlanViewModel;
    var PopUpBesuchPlanCtrl = (function () {
        function PopUpBesuchPlanCtrl(PopUpBesuchPlan, $scope) {
            this.PopUpBesuchPlan = PopUpBesuchPlan;
            this.$scope = $scope;
            $scope.vm = new PopUpBesuchPlanViewModel(PopUpBesuchPlan);
        }
        return PopUpBesuchPlanCtrl;
    })();
    TIP.PopUpBesuchPlanCtrl = PopUpBesuchPlanCtrl;
    angular
        .module("tip")
        .controller("PopUpBesuchPlanCtrl", ["PopUpBesuchPlanService", "$scope", PopUpBesuchPlanCtrl]);
})(TIP || (TIP = {}));
