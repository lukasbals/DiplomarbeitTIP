var TIP;
(function (TIP) {
    var BesuchPlanViewModel = (function () {
        function BesuchPlanViewModel(besuchPlan) {
            var _this = this;
            this.besuchPlan = besuchPlan;
            this.detailBesuchPlanDataSource = null;
            this.startDate = null;
            this.endDate = null;
            this.getParameter = function (theParameter) {
                var params = window.location.search.substr(1).split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = params[i].split('=');
                    if (p[0] == theParameter) {
                        return decodeURIComponent(p[1]);
                    }
                }
                return false;
            };
            this.dataSourceBesuchPlan = null;
            this.schedulerBesuchPlan = {
                bindingOptions: {
                    dataSource: "vm.dataSourceBesuchPlan"
                },
                views: ["workWeek", "day"],
                currentView: "workWeek",
                currentDate: new Date(2012, 1, 3),
                startDayHour: 8,
                endDayHour: 19,
                width: "100%",
                height: "100%",
                onAppointmentAdding: function (options) {
                    console.log(options.appointment.text + options.appointment.startDate);
                    DevExpress.ui.notify(options.Betreff, "success", 1000);
                },
                onAppointmentDeleted: function (options) {
                    console.log(options.appointment);
                    var id = options.appointment.ClientId;
                    _this.besuchPlan.deleteBesuchPlanAppointment(id);
                },
                onAppointmentUpdated: function (options) {
                    var id_geschaeftspartner = options.appointment.IdGeschaeftspartner;
                    var startDate = options.appointment.startDate;
                    var endDate = options.appointment.endDate;
                    var id = options.appointment.ClientId;
                    _this.besuchPlan.updateBesuchPlanAppointment(id_geschaeftspartner, startDate, endDate, id);
                }
            };
        }
        BesuchPlanViewModel.prototype.initDetailBesuchPlan = function () {
            var _this = this;
            var id = this.getParameter("id");
            var startDate = this.getParameter("startDate");
            var endDate = this.getParameter("endDate");
            if (id >= 0) {
                this.besuchPlan.getDetailBesuchPlan(id)
                    .success(function (data) {
                    console.log(data);
                    _this.besuchPlan.parse(data);
                    _this.detailBesuchPlanDataSource = data[0];
                    _this.startDate = data[0].startDate;
                    _this.endDate = data[0].endDate;
                    alert(_this.endDate);
                });
            }
            else {
                this.startDate = startDate;
                this.endDate = endDate;
            }
        };
        BesuchPlanViewModel.prototype.initBesuchPlan = function () {
            var _this = this;
            this.besuchPlan.getBesuchPlan()
                .success(function (data) {
                _this.besuchPlan.parse(data);
                _this.dataSourceBesuchPlan = data;
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
