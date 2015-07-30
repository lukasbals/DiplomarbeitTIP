var TIP;
(function (TIP) {
    var GeschaeftspartnerViewModel = (function () {
        function GeschaeftspartnerViewModel(my) {
            this.my = my;
            this.detailGeschaeftspartnerDataSource = null;
            this.getParameter = function (theParameter) {
                var params = window.location.search.substr(1).split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = params[i].split('=');
                    if (p[0] == theParameter) {
                        return decodeURIComponent(p[1]);
                    }
                }
                return false;
            };
            this.dataSourceGeschaeftspartner = null;
            this.gridGeschaeftspartner = {
                columns: [{
                        dataField: 'GpNummer',
                        caption: "Nummer",
                        width: 70,
                        allowFiltering: false
                    }, {
                        dataField: 'Firmenbez1'
                    }, {
                        dataField: 'Firmenbez2',
                        width: 200
                    }, {
                        dataField: 'Strasse',
                        width: 200,
                        allowFiltering: false
                    }, {
                        dataField: 'Plz',
                        width: 60,
                        allowFiltering: false
                    }, {
                        dataField: "Ort",
                        width: 150,
                        allowFiltering: false
                    }, {
                        dataField: "CodeLand",
                        width: 50,
                        caption: "Land",
                        allowFiltering: false
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSourceGeschaeftspartner"
                },
                paging: {
                    pageSize: 25
                },
                searchPanel: {
                    visible: true,
                    width: 250,
                    highlightSearchText: false,
                    placeholder: "Suchen..."
                },
                rowClick: function (options) {
                    window.location.href = "http://localhost:3000/detail/detailGeschaeftspartner?id=" + options.data.Id;
                }
            };
        }
        GeschaeftspartnerViewModel.prototype.initDetailGeschaeftspartner = function () {
            var _this = this;
            var id = this.getParameter("id");
            this.my.getGeschaeftspartnerDetail(id)
                .success(function (data) {
                _this.detailGeschaeftspartnerDataSource = data[0];
            })
                .error(function (data) {
                console.log("Keine DetailDaten bekommen.");
            });
        };
        GeschaeftspartnerViewModel.prototype.initGeschaeftspartner = function () {
            var _this = this;
            this.my.getGeschaeftspartner()
                .success(function (data) {
                _this.dataSourceGeschaeftspartner = data;
            })
                .error(function (data) {
                console.log("Keine Geschaeeftspartner bekommen.");
            });
        };
        return GeschaeftspartnerViewModel;
    })();
    TIP.GeschaeftspartnerViewModel = GeschaeftspartnerViewModel;
    var GeschaeftspartnerCtrl = (function () {
        function GeschaeftspartnerCtrl(my, $scope) {
            this.my = my;
            this.$scope = $scope;
            $scope.vm = new GeschaeftspartnerViewModel(my);
        }
        return GeschaeftspartnerCtrl;
    })();
    TIP.GeschaeftspartnerCtrl = GeschaeftspartnerCtrl;
    angular
        .module("tip")
        .controller("GeschaeftspartnerCtrl", ["MyService", "$scope", GeschaeftspartnerCtrl]);
})(TIP || (TIP = {}));
