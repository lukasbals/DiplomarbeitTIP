var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.dataSource = null;
            this.getGeschaeftspartner = {
                text: "getGeschaeftspartner",
                onClick: function () {
                    DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!");
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
                        width: 50
                    }, {
                        dataField: 'Firmenbez1',
                        width: 200
                    }, {
                        dataField: 'Firmenbez2',
                        width: 150
                    }, {
                        dataField: 'Strasse',
                        width: 200
                    }, {
                        dataField: 'Plz'
                    }, {
                        dataField: 'Ort'
                    }, {
                        dataField: 'Telefon'
                    }, {
                        dataField: 'Email'
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSource"
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
