var TIP;
(function (TIP) {
    var TestCtrl = (function () {
        function TestCtrl(test, $scope) {
            var _this = this;
            this.test = test;
            this.$scope = $scope;
            $scope.getID = function () {
                _this.test.getID($scope.id)
                    .success(function (data) {
                    var d = JSON.stringify(data);
                    alert(d);
                    $scope.contents = data[0];
                }).
                    error(function (data) {
                });
            };
        }
        return TestCtrl;
    })();
    TIP.TestCtrl = TestCtrl;
    angular
        .module("tip")
        .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
})(TIP || (TIP = {}));
