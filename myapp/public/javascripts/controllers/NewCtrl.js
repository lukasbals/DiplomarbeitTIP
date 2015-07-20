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
        }
        return TestViewModel;
    })();
    TIP.TestViewModel = TestViewModel;
    var NewCtrl = (function () {
        function NewCtrl(test, $scope) {
            this.test = test;
            this.$scope = $scope;
            $scope.vm = new TestViewModel(test);
        }
        return NewCtrl;
    })();
    TIP.NewCtrl = NewCtrl;
    angular
        .module("tip")
        .controller("NewCtrl", ["Test", "$scope", NewCtrl]);
})(TIP || (TIP = {}));
