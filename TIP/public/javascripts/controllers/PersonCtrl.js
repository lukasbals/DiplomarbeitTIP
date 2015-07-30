var TIP;
(function (TIP) {
    var PersonViewModel = (function () {
        function PersonViewModel(my) {
            this.my = my;
            this.detailPersonDataSource = null;
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
            this.dataSourcePerson = null;
            this.gridPerson = {
                columns: [{
                        dataField: 'CodeAnrede',
                        caption: "Anrede",
                        width: 70,
                        allowFiltering: false
                    }, {
                        dataField: 'Titel',
                        allowFiltering: false,
                        width: 90
                    }, {
                        dataField: 'Vorname'
                    }, {
                        dataField: 'Nachname'
                    }, {
                        dataField: 'Abteilung'
                    }, {
                        dataField: "Telefon",
                        width: 150,
                        allowFiltering: false
                    }, {
                        dataField: "Email",
                        width: 230,
                        allowFiltering: false
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSourcePerson"
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
                    window.location.href = "http://localhost:3000/detail/detailPerson?id=" + options.data.Id;
                }
            };
        }
        PersonViewModel.prototype.initDetailPerson = function () {
            var _this = this;
            var id = this.getParameter("id");
            this.my.getPersonDetail(id)
                .success(function (data) {
                _this.detailPersonDataSource = data;
            })
                .error(function (data) {
                console.log("Keine DetailDaten bekommen.");
            });
        };
        PersonViewModel.prototype.initPerson = function () {
            var _this = this;
            this.my.getPerson()
                .success(function (data) {
                _this.dataSourcePerson = data;
            })
                .error(function (data) {
                console.log("Keine Personen bekommen.");
            });
        };
        return PersonViewModel;
    })();
    TIP.PersonViewModel = PersonViewModel;
    var PersonCtrl = (function () {
        function PersonCtrl(my, $scope) {
            this.my = my;
            this.$scope = $scope;
            $scope.vm = new PersonViewModel(my);
        }
        return PersonCtrl;
    })();
    TIP.PersonCtrl = PersonCtrl;
    angular
        .module("tip")
        .controller("PersonCtrl", ["MyService", "$scope", PersonCtrl]);
})(TIP || (TIP = {}));
