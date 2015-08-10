var TIP;
(function (TIP) {
    var PopUpBesuchPlanViewModel = (function () {
        function PopUpBesuchPlanViewModel(PopUpBesuchPlan) {
            var _this = this;
            this.PopUpBesuchPlan = PopUpBesuchPlan;
            this.visiblePopup = false;
            this.text = "Tobis schönster Tag!";
            this.Button = {
                text: "Click me!",
                onClick: function () {
                    console.log("IN");
                    _this.visiblePopup = true;
                    console.log(_this.visiblePopup);
                }
            };
            this.popUpOptions = {
                width: 300,
                height: 250,
                contentTemplate: this.info,
                showTitle: true,
                title: "Information",
                bindingOptions: {
                    visible: "vm.visiblePopup"
                },
                dragEnabled: false,
                closeOnOutsideClick: true
            };
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
