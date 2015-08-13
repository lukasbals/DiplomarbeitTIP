var TIP;
(function (TIP) {
    var BesuchPlanViewModel = (function () {
        function BesuchPlanViewModel(besuchPlan) {
            var _this = this;
            this.besuchPlan = besuchPlan;
            this.dataSourceGeschaeftspartnerForSearch = null;
            this.detailBesuchPlanDataSource = null;
            this.gpId = null;
            this.startDate = null;
            this.endDate = null;
            this.lookup = {
                placeholder: "Geschäftspartner ändern...",
                bindingOptions: {
                    dataSource: "vm.dataSourceGeschaeftspartnerForSearch",
                },
                displayExpr: "Firmenbez1",
                title: "Geschäftspartner",
                onValueChanged: function (options) {
                    _this.gpId = options.itemData.Id;
                }
            };
            this.dateboxAnfang = {
                format: "datetime",
                bindingOptions: {
                    value: "vm.startDate"
                },
                onClosed: function (option) {
                    _this.startDate = option.model.vm.startDate;
                }
            };
            this.dateboxEnde = {
                format: "datetime",
                bindingOptions: {
                    value: "vm.endDate"
                },
                onClosed: function (option) {
                    _this.endDate = option.model.vm.endDate;
                }
            };
            this.loeschen = {
                type: "danger",
                text: "Löschen",
                onClick: function () {
                    _this.besuchPlan.deleteBesuchPlanAppointment(_this.detailBesuchPlanDataSource.ClientId);
                    window.location.href = "/besuchPlan";
                }
            };
            this.update = {
                type: "success",
                text: "Speichern",
                onClick: function () {
                    _this.besuchPlan.updateBesuchPlanAppointment(_this.gpId, _this.startDate, _this.endDate, _this.detailBesuchPlanDataSource.ClientId);
                    DevExpress.ui.notify("Sie haben den Termin angepasst.", "success", 3000);
                }
            };
            this.save = {
                type: "success",
                text: "Speichern",
                onClick: function () {
                    _this.besuchPlan.saveBesuchPlanAppointment(_this.gpId, _this.startDate, _this.endDate)
                        .success(function (data) {
                        window.location.href = "/besuchPlan";
                    });
                }
            };
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
                startDayHour: 7,
                endDayHour: 19,
                width: "100%",
                height: "100%",
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
            this.besuchPlan.getAllGeschaeftspartnerForSearch()
                .success(function (data) {
                _this.dataSourceGeschaeftspartnerForSearch = data;
            });
            var id = this.getParameter("id");
            if (id >= 0) {
                this.besuchPlan.getDetailBesuchPlan(id)
                    .success(function (data) {
                    _this.besuchPlan.parse(data[0]);
                    _this.detailBesuchPlanDataSource = data[0];
                    _this.startDate = new Date(data[0].startDate);
                    _this.endDate = new Date(data[0].endDate);
                });
            }
            else {
                this.startDate = new Date(this.getParameter("startDate"));
                this.endDate = new Date(this.getParameter("endDate"));
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
