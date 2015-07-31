var TIP;
(function (TIP) {
    var LoadViewModel = (function () {
        function LoadViewModel(my) {
            this.my = my;
            this.loadIndicator = false;
        }
        LoadViewModel.prototype.synchButton = function () {
            this.my.synchDB()
                .success(function () {
                console.log("success");
            })
                .error(function () {
                alert("Fehler beim Synchronisieren der Datenbanken");
            });
        };
        return LoadViewModel;
    })();
    TIP.LoadViewModel = LoadViewModel;
    var LoadCtrl = (function () {
        function LoadCtrl(my, $scope) {
            this.my = my;
            this.$scope = $scope;
            $scope.vm = new LoadViewModel(my);
        }
        return LoadCtrl;
    })();
    TIP.LoadCtrl = LoadCtrl;
    angular
        .module("tip")
        .controller("LoadCtrl", ["LoadService", "$scope", LoadCtrl]);
})(TIP || (TIP = {}));
