var TIP;
(function (TIP) {
    var BesuchViewModel = (function () {
        function BesuchViewModel(besuch) {
            var _this = this;
            this.besuch = besuch;
            this.currentDate = new Date();
            this.dataSourceGeschaeftspartnerForSearch = null;
            this.dataSourceBesuchstypForSearch = null;
            this.dataSourceBericht = null;
            this.detailBesuchDataSource = null;
            this.geschaeftspartnerId = null;
            this.besuchstypId = null;
            this.startDate = null;
            this.endDate = null;
            this.gpName = null;
            this.neuerBericht = false;
            this.lookupGeschaeftspartner = {
                placeholder: "Geschäftspartner ändern...",
                bindingOptions: {
                    dataSource: "vm.dataSourceGeschaeftspartnerForSearch",
                },
                displayExpr: "Firmenbez1",
                title: "Geschäftspartner",
                onValueChanged: function (options) {
                    _this.geschaeftspartnerId = options.itemData.Id;
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
                    _this.besuchstypId = options.itemData.Id;
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
                    var idForUpdate;
                    var isOnServer;
                    if (_this.detailBesuchDataSource.Id == null) {
                        idForUpdate = _this.detailBesuchDataSource.ClientId;
                        isOnServer = "client_id";
                    }
                    else {
                        idForUpdate = _this.detailBesuchDataSource.Id;
                        isOnServer = "id";
                    }
                    _this.besuch.updateBesuchAppointment(_this.geschaeftspartnerId, _this.besuchstypId, _this.startDate, _this.endDate, idForUpdate, _this.berichtHeadingContent, _this.berichtContentContent, isOnServer)
                        .success(function (data) {
                        window.location.href = "/Besuch";
                    });
                    _this.besuch.updateBericht(_this.dataSourceBericht)
                        .success(function (data) {
                        console.log("success");
                    });
                }
            };
            this.save = {
                type: "success",
                text: "Speichern",
                onClick: function () {
                    _this.besuch.saveBesuchAppointment(_this.geschaeftspartnerId, _this.besuchstypId, _this.startDate, _this.endDate, _this.berichtHeadingContent, _this.berichtContentContent)
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
            this.deleteBericht = {
                text: "X",
                type: "danger",
                width: "100%",
                onClick: function (data) {
                    _this.besuch.deleteBericht(data.model.bericht.ClientId)
                        .success(function (data) {
                        history.go(0);
                    });
                }
            };
            this.berichtHeadingContent = null;
            this.berichtHeading = {
                placeholder: "Titel ...",
                onChange: function () {
                }
            };
            this.berichtContentContent = null;
            this.berichtContent = {
                placeholder: "Bericht ... ",
                height: 100,
                onChange: function () {
                }
            };
            this.bericht = {
                text: "Neuen Bericht erstellen",
                type: "default",
                onClick: function () {
                    _this.neuerBericht = true;
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
                    var idForUpdate;
                    var isOnServer;
                    console.log(options.appointment);
                    if (options.appointment.Id == null) {
                        idForUpdate = options.appointment.ClientId;
                        isOnServer = "client_id";
                    }
                    else {
                        idForUpdate = options.appointment.Id;
                        isOnServer = "id";
                    }
                    _this.besuch.updateBesuchAppointment(id_geschaeftspartner, id_besuchstyp, startDate, endDate, idForUpdate, _this.berichtHeadingContent, _this.berichtContentContent, isOnServer);
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
                    _this.geschaeftspartnerId = data[0].IdGeschaeftspartner;
                    _this.besuchstypId = data[0].IdBesuchstyp;
                    _this.gpName = data[0].Firmenbez1;
                    console.log(_this.detailBesuchDataSource);
                    var idForBericht = null;
                    var isOnServer = null;
                    if (_this.detailBesuchDataSource.Id != null) {
                        idForBericht = _this.detailBesuchDataSource.Id;
                        isOnServer = "id_besuch";
                    }
                    else {
                        idForBericht = _this.detailBesuchDataSource.ClientId;
                        isOnServer = "client_id_besuch";
                    }
                    _this.besuch.getBerichtById(idForBericht, isOnServer)
                        .success(function (data) {
                        console.log(data);
                        _this.dataSourceBericht = data;
                        if (_this.dataSourceBericht[0] == null) {
                            _this.neuerBericht = true;
                        }
                    });
                });
            }
            else {
                this.neuerBericht = true;
                this.geschaeftspartnerId = this.getParameter("IdGeschaeftspartner");
                if (this.geschaeftspartnerId >= 0) {
                    this.besuch.getDetailGeschaeftspartner(this.geschaeftspartnerId)
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
