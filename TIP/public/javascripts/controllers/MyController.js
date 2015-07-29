var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.loadIndicator = false;
            this.id = null;
            this.gp_nummer = null;
            this.code_gpkz = null;
            this.firmenbez_1 = null;
            this.firmenbez_2 = null;
            this.firmenbez_3 = null;
            this.strasse = null;
            this.code_land = null;
            this.plz = null;
            this.ort = null;
            this.telefon = null;
            this.fax = null;
            this.email = null;
            this.homepage = null;
            this.vorname = null;
            this.nachname = null;
            this.abteilung = null;
            this.mobil = null;
            this.geburtsdatum = null;
            this.id_geschaeftspartner = null;
            this.code_gruppe = null;
            this.code_anrede = null;
            this.titel = null;
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
                        caption: "Nummer",
                        width: 70,
                        allowFiltering: false
                    }, {
                        dataField: 'Firmenbez1'
                    }, {
                        dataField: 'Firmenbez2',
                        width: 200
                    }, {
                        dataField: 'Strasse',
                        width: 200,
                        allowFiltering: false
                    }, {
                        dataField: 'Plz',
                        width: 60,
                        allowFiltering: false
                    }, {
                        dataField: "Ort",
                        width: 150,
                        allowFiltering: false
                    }, {
                        dataField: "CodeLand",
                        width: 50,
                        caption: "Land",
                        allowFiltering: false
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSourceGeschaeftspartner"
                },
                searchPanel: {
                    visible: true,
                    width: 250,
                    highlightSearchText: false
                },
                rowClick: function (options) {
                    _this.loadIndicator = true;
                    window.location.replace("http://localhost:3000/detail/detailGeschaeftspartner?id=" + options.data.Id);
                }
            };
            this.dataSourcePerson = null;
            this.gridPerson = {
                loadPanel: false,
                columns: [{
                        dataField: 'CodeAnrede',
                        caption: "Anrede",
                        width: 70,
                        allowFiltering: false
                    }, {
                        dataField: 'Titel',
                        allowFiltering: false,
                        width: 90
                    }, {
                        dataField: 'Vorname'
                    }, {
                        dataField: 'Nachname'
                    }, {
                        dataField: 'Abteilung'
                    }, {
                        dataField: "Telefon",
                        width: 150,
                        allowFiltering: false
                    }, {
                        dataField: "Email",
                        width: 230,
                        allowFiltering: false
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSourcePerson"
                },
                searchPanel: {
                    visible: true,
                    width: 250,
                    highlightSearchText: false
                },
                rowClick: function (options) {
                    _this.loadIndicator = true;
                    window.location.replace("http://localhost:3000/detail/detailPerson?id=" + options.data.Id);
                }
            };
        }
        MyViewModel.prototype.initDetailGeschaeftspartner = function () {
            var _this = this;
            this.loadIndicator = true;
            var id = this.getParameter("id");
            this.my.getGeschaeftspartnerDetail(id)
                .success(function (data) {
                _this.id = data[0].id;
                _this.gp_nummer = data[0].gp_nummer;
                _this.code_gpkz = data[0].code_gpkz;
                _this.firmenbez_1 = data[0].firmenbez_1;
                _this.firmenbez_2 = data[0].firmenbez_2;
                _this.firmenbez_3 = data[0].firmenbez_3;
                _this.strasse = data[0].strasse;
                _this.code_land = data[0].code_land;
                _this.plz = data[0].plz;
                _this.ort = data[0].ort;
                _this.telefon = data[0].telefon;
                _this.fax = data[0].fax;
                _this.email = data[0].email;
                _this.homepage = data[0].homepage;
                _this.loadIndicator = false;
            })
                .error(function (data) {
                console.log("Keine DetailDaten bekommen.");
                _this.loadIndicator = false;
            });
        };
        MyViewModel.prototype.initDetailPerson = function () {
            var _this = this;
            this.loadIndicator = true;
            var id = this.getParameter("id");
            this.my.getPersonDetail(id)
                .success(function (data) {
                _this.nachname = data[0].nachname;
                _this.vorname = data[0].vorname;
                _this.abteilung = data[0].abteilung;
                _this.telefon = data[0].telefon;
                _this.mobil = data[0].mobil;
                _this.fax = data[0].fax;
                _this.email = data[0].email;
                _this.geburtsdatum = data[0].geburtstdatum;
                _this.id_geschaeftspartner = data[0].id_geschaeftspartner;
                _this.code_gruppe = data[0].code_gruppe;
                _this.code_anrede = data[0].code_anrede;
                _this.id = data[0].id;
                _this.titel = data[0].titel;
                _this.loadIndicator = false;
            })
                .error(function (data) {
                console.log("Keine DetailDaten bekommen.");
                _this.loadIndicator = false;
            });
        };
        MyViewModel.prototype.initGeschaeftspartner = function () {
            var _this = this;
            this.loadIndicator = true;
            this.my.getGeschaeftspartner()
                .success(function (data) {
                _this.dataSourceGeschaeftspartner = data;
                _this.loadIndicator = false;
            })
                .error(function (data) {
                console.log("Keine Geschaeeftspartner bekommen.");
                _this.loadIndicator = false;
            });
        };
        MyViewModel.prototype.initPerson = function () {
            var _this = this;
            this.loadIndicator = true;
            this.my.getPerson()
                .success(function (data) {
                _this.dataSourcePerson = data;
                _this.loadIndicator = false;
            })
                .error(function (data) {
                console.log("Keine Personen bekommen.");
                _this.loadIndicator = false;
            });
        };
        return MyViewModel;
    })();
    TIP.MyViewModel = MyViewModel;
    var MyController = (function () {
        function MyController(my, $scope) {
            this.my = my;
            this.$scope = $scope;
            $scope.vm = new MyViewModel(my);
        }
        return MyController;
    })();
    TIP.MyController = MyController;
    angular
        .module("tip")
        .controller("MyController", ["MyService", "$scope", MyController]);
})(TIP || (TIP = {}));
