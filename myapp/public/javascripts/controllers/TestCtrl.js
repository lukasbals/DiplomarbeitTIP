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
                    $scope.contents = data;
                })
                    .error(function (data) {
                    alert("User nicht gefunden");
                });
            };
            $scope.getData = function () {
                _this.test.getData()
                    .success(function (data) {
                    $scope.databases = data;
                })
                    .error(function (data) {
                    alert("Keine Daten gefunden auf der Datenbank");
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
