var TIP;
(function (TIP) {
    var LoadViewModel = (function () {
        function LoadViewModel(loading) {
            this.loading = loading;
            this.isLoading = false;
        }
        LoadViewModel.prototype.initIsLoading = function () {
            var _this = this;
            setInterval(function () {
                _this.loading.getIsSyncActive()
                    .success(function (data) {
                    _this.isLoading = data;
                }).error(function (data) {
                });
            }, 1000);
        };
        LoadViewModel.prototype.synchButton = function () {
            this.loading.synchDB()
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
        function LoadCtrl(loading, $scope) {
            this.loading = loading;
            this.$scope = $scope;
            $scope.vm = new LoadViewModel(loading);
        }
        return LoadCtrl;
    })();
    TIP.LoadCtrl = LoadCtrl;
    angular
        .module("tip")
        .controller("LoadCtrl", ["LoadService", "$scope", LoadCtrl]);
})(TIP || (TIP = {}));
