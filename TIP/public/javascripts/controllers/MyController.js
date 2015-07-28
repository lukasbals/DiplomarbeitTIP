var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.loadIndicator = false;
            this.firstAttribute = null;
            this.secondAttribute = null;
            this.linkMainPage = null;
            this.detailDataSource = null;
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
            this.gridDetails = {
                bindingOptions: {
                    dataSource: "vm.detailDataSource"
                },
                grouped: true
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
                    window.location.replace("http://localhost:3000/details?id=" + options.data.Id + "&table=" + "geschaeftspartner_st");
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
                    window.location.replace("http://localhost:3000/details?id=" + options.data.Id + "&table=" + "personen_st");
                }
            };
        }
        MyViewModel.prototype.initDetail = function () {
            var _this = this;
            this.loadIndicator = true;
            var id = this.getParameter("id");
            var table = this.getParameter("table");
            this.my.getDetails(id, table)
                .success(function (data) {
                if (table == "geschaeftspartner_st") {
                    _this.firstAttribute = "Geschäftspartner";
                    _this.secondAttribute = data[0].firmenbez_1;
                    _this.linkMainPage = "geschaeftspartner";
                }
                else if (table == "personen_st") {
                    _this.firstAttribute = "Personen";
                    _this.secondAttribute = data[0].nachname;
                    _this.linkMainPage = "person";
                }
                _this.detailDataSource = data;
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
