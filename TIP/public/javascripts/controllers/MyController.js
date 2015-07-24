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
                columns: [
                    'Id',
                    'GpNummer',
                    'CodeGpKz',
                    'Firmenbez1',
                    'Firmenbez2',
                    'Firmenbez3',
                    'Strasse',
                    'Codeland',
                    'Plz',
                    'Ort',
                    'Telefon',
                    'Fax',
                    'Email',
                    'Homepage'
                ],
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
