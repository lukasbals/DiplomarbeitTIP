var TIP;
(function (TIP) {
    var BesuchPlanViewModel = (function () {
        function BesuchPlanViewModel(besuchPlan) {
            this.besuchPlan = besuchPlan;
            this.dataSourceBesuchPlan = null;
            this.schedulerBesuchPlan = {
                bindingOptions: {
                    dataSource: "vm.dataSourceBesuchPlan"
                },
                views: ["month", "week", "workWeek", "day"],
                currentView: "workWeek",
                currentDate: new Date(),
                firstDayOfWeek: 1,
                startDayHour: 8,
                endDayHour: 19,
                width: "100%",
                height: 600
            };
        }
        ;
        BesuchPlanViewModel.prototype.initBesuchPlan = function () {
            var _this = this;
            this.besuchPlan.getBesuchPlan()
                .success(function (data) {
                _this.dataSourceBesuchPlan = [
                    {
                        text: "Website Re-Design Plan",
                        startDate: new Date("2015-08-05T09:00:00"),
                        endDate: new Date("2015-08-05T10:00:00")
                    }
                ];
                console.log(_this.dataSourceBesuchPlan);
            })
                .error(function (data) {
                console.log("Keine BesuchPlane bekommen.");
            });
        };
        return BesuchPlanViewModel;
    })();
    TIP.BesuchPlanViewModel = BesuchPlanViewModel;
    var BesuchPlanCtrl = (function () {
        function BesuchPlanCtrl(besuchPlan, $scope) {
            this.besuchPlan = besuchPlan;
            this.$scope = $scope;
            $scope.vm = new BesuchPlanViewModel(besuchPlan);
        }
        return BesuchPlanCtrl;
    })();
    TIP.BesuchPlanCtrl = BesuchPlanCtrl;
    angular
        .module("tip")
        .controller("BesuchPlanCtrl", ["BesuchPlanService", "$scope", BesuchPlanCtrl]);
})(TIP || (TIP = {}));
