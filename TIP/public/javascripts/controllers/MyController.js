var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.dataSource = null;
            this.i = function () {
                window.location.replace("http://localhost:3000/geschaeftspartner");
            };
            this.getGeschaeftspartner = {
                text: "Geschäftspartner",
                activeStateEnabled: false,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                onClick: function () {
                    DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!", "success", 2000);
                    _this.my.getGeschaeftspartner()
                        .success(function (data) {
                        console.log(data);
                        _this.dataSource = data;
                    })
                        .error(function (data) {
                        console.log("Keine Geschaeeftspartner bekommen.");
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
                    dataSource: "vm.dataSource"
                },
                searchPanel: {
                    visible: true,
                    width: 250,
                    highlightSearchText: false
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
