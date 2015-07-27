var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.homePage = true;
            this.loadIndicator = false;
            this.dataSourceGeschaeftspartner = null;
            this.dataSourcePerson = null;
            this.getGeschaeftspartner = {
                text: "Geschäftspartner",
                activeStateEnabled: false,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                onClick: function () {
                    _this.loadIndicator = true;
                    _this.my.getGeschaeftspartner()
                        .success(function (data) {
                        _this.dataSourcePerson = null;
                        _this.dataSourceGeschaeftspartner = data;
                        _this.loadIndicator = false;
                        _this.homePage = false;
                    })
                        .error(function (data) {
                        console.log("Keine Geschaeeftspartner bekommen.");
                        _this.loadIndicator = false;
                    });
                }
            };
            this.getPerson = {
                text: "Personen",
                activeStateEnabled: false,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                onClick: function () {
                    _this.loadIndicator = true;
                    _this.my.getPerson()
                        .success(function (data) {
                        _this.dataSourceGeschaeftspartner = null;
                        _this.dataSourcePerson = data;
                        _this.loadIndicator = false;
                        _this.homePage = false;
                    })
                        .error(function (data) {
                        console.log("Keine Personen bekommen.");
                        _this.loadIndicator = false;
                    });
                }
            };
            this.gridGeschaeftspartner = {
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
                    console.log(options.data);
                }
            };
            this.gridPerson = {
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
                rowClick: function () {
                    alert("IN");
                }
            };
        }
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
