var TIP;
(function (TIP) {
    var TestCtrl = (function () {
        function TestCtrl(test, $scope) {
            var _this = this;
            this.test = test;
            this.$scope = $scope;
            $scope.getProduct = function () {
                _this.test.getProduct($scope.vorname);
            };
        }
        return TestCtrl;
    })();
    TIP.TestCtrl = TestCtrl;
    angular.module("tip").controller("TestCtrl", ["Test", "$scope", TestCtrl]);
})(TIP || (TIP = {}));
