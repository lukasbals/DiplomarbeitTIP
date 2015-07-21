var TIP;
(function (TIP) {
    var IViewModel = (function () {
        function IViewModel(i) {
            this.i = i;
        }
        return IViewModel;
    })();
    TIP.IViewModel = IViewModel;
    var TestCtrl = (function () {
        function TestCtrl(i, $scope) {
            this.i = i;
            this.$scope = $scope;
            $scope.vm = new IViewModel(i);
        }
        return TestCtrl;
    })();
    TIP.TestCtrl = TestCtrl;
    angular
        .module("tip")
        .controller("IController", ["I", "$scope", IController]);
})(TIP || (TIP = {}));
