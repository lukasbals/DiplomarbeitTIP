var TIP;
(function (TIP) {
    var PersonViewModel = (function () {
        function PersonViewModel(person) {
            this.person = person;
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
                        allowFiltering: true
                    }, {
                        dataField: 'Titel',
                        allowFiltering: true,
                        width: 90
                    }, {
                        dataField: 'Vorname',
                        allowFiltering: true
                    }, {
                        dataField: 'Nachname',
                        allowFiltering: true
                    }, {
                        dataField: 'Abteilung',
                        allowFiltering: true
                    }, {
                        dataField: "Telefon",
                        width: 150,
                        allowFiltering: true
                    }, {
                        dataField: "Email",
                        width: 230,
                        allowFiltering: true
                    }],
                columnAutoWidth: true,
                bindingOptions: {
                    dataSource: "vm.dataSourcePerson"
                },
                scrolling: {
                    mode: 'infinite'
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
            this.person.getDetailPerson(id)
                .success(function (data) {
                _this.detailPersonDataSource = data[0];
            })
                .error(function (data) {
                console.log("Keine DetailDaten bekommen.");
            });
        };
        PersonViewModel.prototype.initPerson = function () {
            var _this = this;
            this.person.getPerson()
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
        function PersonCtrl(person, $scope) {
            this.person = person;
            this.$scope = $scope;
            $scope.vm = new PersonViewModel(person);
        }
        return PersonCtrl;
    })();
    TIP.PersonCtrl = PersonCtrl;
    angular
        .module("tip")
        .controller("PersonCtrl", ["PersonService", "$scope", PersonCtrl]);
})(TIP || (TIP = {}));
