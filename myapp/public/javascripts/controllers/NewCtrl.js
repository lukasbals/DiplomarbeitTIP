var TIP;
(function (TIP) {
    var TestViewModel = (function () {
        function TestViewModel(test) {
            this.test = test;
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
