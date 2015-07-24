var TIP;
(function (TIP) {
    var MyViewModel = (function () {
        function MyViewModel(my) {
            var _this = this;
            this.my = my;
            this.getGeschaeftspartner = {
                text: "getGeschaeftspartner",
                onClick: function () {
                    DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!");
                    _this.my.getGeschaeftspartner()
                        .success(function (data) {
                        console.log(data);
                        data = this.tipData;
                    })
                        .error(function (data) {
                        console.log("Keine Geschaeeftspartner bekommen.");
                    });
                }
            };
            this.gridGeschaeftspartner = {
                dataSource: this.tipData,
                columns: [
                    'Id',
                    'GpNummer',
                    'CodeGpKz',
                    'Firmenbez1',
                    'Firmenbez2',
                    'Firmenbez3',
                    'Strasse',
                    'Codeland',
                    'Plz',
                    'Ort',
                    'Telefon',
                    'Fax',
                    'Email',
                    'Homepage'
                ]
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
