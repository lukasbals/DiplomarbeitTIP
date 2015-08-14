var TIP;
(function (TIP) {
    var BesuchViewModel = (function () {
        function BesuchViewModel(besuch) {
            var _this = this;
            this.besuch = besuch;
            this.currentDate = new Date();
            this.dataSourceGeschaeftspartnerForSearch = null;
            this.dataSourceBesuchstypForSearch = null;
            this.detailBesuchDataSource = null;
            this.gpId = null;
            this.btId = null;
            this.startDate = null;
            this.endDate = null;
            this.gpName = null;
            this.lookupGeschaeftspartner = {
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
            this.lookupBesuchstyp = {
                placeholder: "Besuchstyp ändern...",
                bindingOptions: {
                    dataSource: "vm.dataSourceBesuchstypForSearch",
                },
                displayExpr: "Bezeichnung",
                title: "Besuchstypen",
                onValueChanged: function (options) {
                    _this.btId = options.itemData.Id;
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
                    _this.besuch.deleteBesuchAppointment(_this.detailBesuchDataSource.ClientId);
                    window.location.href = "/Besuch";
                }
            };
            this.update = {
                type: "success",
                text: "Speichern",
                onClick: function () {
                    _this.besuch.updateBesuchAppointment(_this.gpId, _this.btId, _this.startDate, _this.endDate, _this.detailBesuchDataSource.ClientId)
                        .success(function (data) {
                        window.location.href = "/Besuch";
                    });
                }
            };
            this.save = {
                type: "success",
                text: "Speichern",
                onClick: function () {
                    _this.besuch.saveBesuchAppointment(_this.gpId, _this.btId, _this.startDate, _this.endDate)
                        .success(function (data) {
                        window.location.href = "/Besuch";
                    });
                }
            };
            this.cancel = {
                text: "Abbrechen",
                onClick: function () {
                    history.go(-1);
                    return true;
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
            this.dataSourceBesuch = null;
            this.schedulerBesuch = {
                bindingOptions: {
                    dataSource: "vm.dataSourceBesuch",
                    currentDate: "vm.currentDate"
                },
                views: ["workWeek", "day"],
                currentView: "workWeek",
                startDayHour: 7,
                endDayHour: 19,
                width: "100%",
                height: "100%",
                onAppointmentDeleted: function (options) {
                    console.log(options.appointment);
                    var id = options.appointment.ClientId;
                    _this.besuch.deleteBesuchAppointment(id);
                },
                onAppointmentUpdated: function (options) {
                    var id_besuchstyp = options.appointment.IdBesuchstyp;
                    var id_geschaeftspartner = options.appointment.IdGeschaeftspartner;
                    var startDate = options.appointment.startDate;
                    var endDate = options.appointment.endDate;
                    var id = options.appointment.ClientId;
                    _this.besuch.updateBesuchAppointment(id_geschaeftspartner, id_besuchstyp, startDate, endDate, id);
                }
            };
        }
        BesuchViewModel.prototype.initDetailBesuch = function () {
            var _this = this;
            this.besuch.getAllGeschaeftspartnerForSearch()
                .success(function (data) {
                _this.dataSourceGeschaeftspartnerForSearch = data;
            });
            this.besuch.getAllBesuchstypForSearch()
                .success(function (data) {
                _this.dataSourceBesuchstypForSearch = data;
            });
            var id = this.getParameter("id");
            if (id >= 0) {
                this.besuch.getDetailBesuch(id)
                    .success(function (data) {
                    _this.besuch.parse(data[0]);
                    _this.detailBesuchDataSource = data[0];
                    _this.startDate = new Date(data[0].startDate);
                    _this.endDate = new Date(data[0].endDate);
                    _this.gpId = data[0].IdGeschaeftspartner;
                    _this.btId = data[0].IdBesuchstyp;
                    _this.gpName = data[0].Firmenbez1;
                    console.log(_this.detailBesuchDataSource);
                });
            }
            else {
                this.gpId = this.getParameter("IdGeschaeftspartner");
                if (this.gpId >= 0) {
                    this.besuch.getDetailGeschaeftspartner(this.gpId)
                        .success(function (data) {
                        _this.gpName = data[0].Firmenbez1;
                    });
                }
                this.startDate = new Date(this.getParameter("startDate"));
                this.endDate = new Date(this.getParameter("endDate"));
            }
        };
        BesuchViewModel.prototype.initBesuch = function () {
            var _this = this;
            this.besuch.getBesuch()
                .success(function (data) {
                _this.besuch.parse(data);
                _this.dataSourceBesuch = data;
            })
                .error(function (data) {
                console.log("Keine Besuche bekommen.");
            });
        };
        return BesuchViewModel;
    })();
    TIP.BesuchViewModel = BesuchViewModel;
    var BesuchCtrl = (function () {
        function BesuchCtrl(besuch, $scope) {
            this.besuch = besuch;
            this.$scope = $scope;
            $scope.vm = new BesuchViewModel(besuch);
        }
        return BesuchCtrl;
    })();
    TIP.BesuchCtrl = BesuchCtrl;
    angular
        .module("tip")
        .controller("BesuchCtrl", ["BesuchService", "$scope", BesuchCtrl]);
})(TIP || (TIP = {}));
