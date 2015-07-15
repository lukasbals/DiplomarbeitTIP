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
                    /*var dataString: string = JSON.stringify(data);
                    alert(dataString);*/
                    $scope.contents = data;
                })
                    .error(function (data) {
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
