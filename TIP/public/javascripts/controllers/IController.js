var TIP;
(function (TIP) {
    var IViewModel = (function () {
        function IViewModel(IController) {
            this.IController = IController;
        }
        return IViewModel;
    })();
    TIP.IViewModel = IViewModel;
    var TestCtrl = (function () {
        function TestCtrl(IController, $scope) {
            this.IController = IController;
            this.$scope = $scope;
            $scope.vm = new IViewModel(IController);
        }
        return TestCtrl;
    })();
    TIP.TestCtrl = TestCtrl;
    angular
        .module("tip")
        .controller("IController", ["IController", "$scope", IController]);
})(TIP || (TIP = {}));
