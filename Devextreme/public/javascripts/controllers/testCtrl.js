var TIP;
(function (TIP) {
    var TestViewModel = (function () {
        function TestViewModel(test) {
            var _this = this;
            this.test = test;
            this.vornameConfig = {
                placeholder: "Vorname",
                bindingOptions: {
                    value: "vm.vorname"
                }
            };
            this.nachnameConfig = {
                placeholder: "Nachname",
                bindingOptions: {
                    value: "vm.nachname"
                }
            };
            this.doSomethingConfig = {
                text: "Do Something",
                onClick: function () {
                    DevExpress.ui.notify("Hallo " + _this.vorname + " " + _this.nachname, "info", 2000);
                }
            };
            this.gridConfig = {
                dataSource: new DevExpress.data.DataSource({}),
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
                ]
            };
        }
        return TestViewModel;
    })();
    TIP.TestViewModel = TestViewModel;
    var TestCtrl = (function () {
        function TestCtrl(test, $scope) {
            this.test = test;
            this.$scope = $scope;
            $scope.vm = new TestViewModel(test);
        }
        return TestCtrl;
    })();
    TIP.TestCtrl = TestCtrl;
    angular
        .module("tip")
        .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
})(TIP || (TIP = {}));
