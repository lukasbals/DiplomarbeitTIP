var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.getGeschaeftspartner = {
                text: "getGeschaeftspartner",
                onClick: function () {
                    _this.my.getGeschaeftspartner()
                        .success(function (data) {
                        console.log(data);
                    });
                    DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!");
                }
            };
        }
        return MyViewModel;
    })();
    TIP.MyViewModel = MyViewModel;
    var MyController = (function () {
        function MyController(my, $scope) {
            this.my = my;
            this.$scope = $scope;
            $scope.vm = new MyViewModel(my);
        }
        return MyController;
    })();
    TIP.MyController = MyController;
    angular
        .module("tip")
        .controller("MyController", ["MyService", "$scope", MyController]);
})(TIP || (TIP = {}));
