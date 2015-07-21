var TIP;
(function (TIP) {
    var IViewModel = (function () {
        function IViewModel(IController) {
            this.IController = IController;
        }
        return IViewModel;
    })();
    TIP.IViewModel = IViewModel;
    var IController = (function () {
        function IController(IController, $scope) {
            this.IController = IController;
            this.$scope = $scope;
            $scope.vm = new IViewModel(IController);
        }
        return IController;
    })();
    TIP.IController = IController;
    angular
        .module("tip")
        .controller("IController", ["IController", "$scope", IController]);
})(TIP || (TIP = {}));
