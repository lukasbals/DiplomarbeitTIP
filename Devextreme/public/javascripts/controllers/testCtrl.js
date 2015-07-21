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
                    _this.test.getData()
                        .success(function (data) {
                        console.log("success");
                        console.log(data);
                    })
                        .error(function () {
                        console.log("error");
                    });
                    DevExpress.ui.notify("Hallo " + _this.vorname + " " + _this.nachname, "info", 2000);
                }
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
