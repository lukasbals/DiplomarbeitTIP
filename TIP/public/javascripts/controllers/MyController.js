var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            this.my = my;
            this.firstNameConfig = {
                placeholder: "Vorname",
                bindingOptions: {
                    value: "vm.vorname"
                }
            };
            this.lastNameConfig = {
                placeholder: "Nachname",
                bindingOptions: {
                    value: "vm.nachname"
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
