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
            $scope.init = function () {
                _this.test.init()
                    .success(function (data) {
                    $scope.teams = data;
                })
                    .error(function () {
                    alert("Es ist ein Fehler passiert!");
                });
            };
            $scope.insertTeam = function () {
                _this.test.insertTeam($scope.team, $scope.country)
                    .success(function () {
                    $scope.init();
                    $scope.team = null;
                    $scope.country = null;
                })
                    .error(function () {
                    alert("error with insert Team");
                });
            };
            $scope.deleteTeam = function (id) {
                _this.test.deleteTeam(id)
                    .success(function () {
                    $scope.init();
                })
                    .error(function () {
                    alert("error with deleteTeam");
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
