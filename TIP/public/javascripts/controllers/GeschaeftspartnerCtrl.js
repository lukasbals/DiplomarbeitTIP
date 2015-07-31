var TIP;
(function (TIP) {
    var GeschaeftspartnerViewModel = (function () {
        function GeschaeftspartnerViewModel(geschaeftspartner) {
            this.geschaeftspartner = geschaeftspartner;
            this.detailGeschaeftspartnerDataSource = null;
            this.detailPersonDataSourceInGP = null;
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
            this.dataSourceGeschaeftspartner = null;
            this.gridGeschaeftspartner = {
                loadPanel: false,
                columns: [{
                        dataField: 'GpNummer',
                        caption: "GP Nummer",
                        width: 70,
                        allowFiltering: true
                    }, {
                        dataField: 'Firmenbez1',
                        allowFiltering: true
                    }, {
                        dataField: 'Firmenbez2',
                        width: 200,
                        allowFiltering: true
                    }, {
                        dataField: 'Strasse',
                        width: 200,
                        allowFiltering: true
                    }, {
                        dataField: 'Plz',
                        width: 60,
                        allowFiltering: true
                    }, {
                        dataField: "Ort",
                        width: 150,
                        allowFiltering: true
                    }, {
                        dataField: "CodeLand",
                        width: 50,
                        caption: "Land",
                        allowFiltering: true
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSourceGeschaeftspartner"
                },
                scrolling: {
                    mode: 'infinite'
                },
                paging: {
                    pageSize: 25
                },
                searchPanel: {
                    visible: true,
                    width: 250,
                    highlightSearchText: false,
                    placeholder: "Suchen..."
                },
                rowClick: function (options) {
                    window.location.href = "http://localhost:3000/detail/detailGeschaeftspartner?id=" + options.data.Id;
                }
            };
            this.gridPersonInGP = {
                columns: [{
                        dataField: "Anrede"
                    }, {
                        dataField: "Vorname"
                    }, {
                        dataField: "Nachname"
                    }, {
                        dataField: "Abteilung"
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.detailPersonDataSourceInGP"
                },
                rowClick: function (options) {
                    window.location.href = "http://localhost:3000/detail/detailPerson?id=" + options.data.Id;
                }
            };
        }
        GeschaeftspartnerViewModel.prototype.initDetailGeschaeftspartner = function () {
            var _this = this;
            var id = this.getParameter("id");
            this.geschaeftspartner.getDetailGeschaeftspartner(id)
                .success(function (data) {
                _this.detailGeschaeftspartnerDataSource = data[0];
            })
                .error(function (data) {
                console.log("Keine DetailDaten bekommen.");
            });
            this.geschaeftspartner.getDetailPersonForGP(id)
                .success(function (data) {
                _this.detailPersonDataSourceInGP = data;
            }).error(function (data) {
                console.log("Keine DetailDaten bekommen.");
            });
        };
        GeschaeftspartnerViewModel.prototype.initGeschaeftspartner = function () {
            var _this = this;
            this.geschaeftspartner.getGeschaeftspartner()
                .success(function (data) {
                _this.dataSourceGeschaeftspartner = data;
            })
                .error(function (data) {
                console.log("Keine Geschaeeftspartner bekommen.");
            });
        };
        return GeschaeftspartnerViewModel;
    })();
    TIP.GeschaeftspartnerViewModel = GeschaeftspartnerViewModel;
    var GeschaeftspartnerCtrl = (function () {
        function GeschaeftspartnerCtrl(geschaeftspartner, $scope) {
            this.geschaeftspartner = geschaeftspartner;
            this.$scope = $scope;
            $scope.vm = new GeschaeftspartnerViewModel(geschaeftspartner);
        }
        return GeschaeftspartnerCtrl;
    })();
    TIP.GeschaeftspartnerCtrl = GeschaeftspartnerCtrl;
    angular
        .module("tip")
        .controller("GeschaeftspartnerCtrl", ["GeschaeftspartnerService", "$scope", GeschaeftspartnerCtrl]);
})(TIP || (TIP = {}));
