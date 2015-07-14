var DREIER;
(function (DREIER) {
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
    DREIER.TestCtrl = TestCtrl;
    angular.module("dreier").controller("TestCtrl", ["Test", "$scope", TestCtrl]);
})(DREIER || (DREIER = {}));
