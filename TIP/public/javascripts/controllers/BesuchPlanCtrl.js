var TIP;
(function (TIP) {
    var BesuchPlanViewModel = (function () {
        function BesuchPlanViewModel(besuchPlan, json) {
            this.besuchPlan = besuchPlan;
            this.json = json;
            this.dataSourceBesuchPlan = null;
            this.schedulerBesuchPlan = {
                bindingOptions: {
                    dataSource: "vm.dataSourceBesuchPlan"
                },
                views: ["workWeek", "day"],
                currentView: "workWeek",
                currentDate: new Date(2015, 7, 3),
                startDayHour: 8,
                endDayHour: 19,
                width: "100%",
                height: 600
            };
        }
        BesuchPlanViewModel.prototype.initBesuchPlan = function () {
            var _this = this;
            this.besuchPlan.getBesuchPlan()
                .success(function (data) {
                _this.json.parse(data);
                _this.dataSourceBesuchPlan = data;
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
        function BesuchPlanCtrl(besuchPlan, json, $scope) {
            this.besuchPlan = besuchPlan;
            this.json = json;
            this.$scope = $scope;
            $scope.vm = new BesuchPlanViewModel(besuchPlan, json);
        }
        return BesuchPlanCtrl;
    })();
    TIP.BesuchPlanCtrl = BesuchPlanCtrl;
    angular
        .module("tip")
        .controller("BesuchPlanCtrl", ["BesuchPlanService", "$scope", "JsonService", BesuchPlanCtrl]);
})(TIP || (TIP = {}));
