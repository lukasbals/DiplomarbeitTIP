module TIP {
  export class PersonViewModel {
    constructor(private person: PersonService) {

    }
    //
    // Detail Page
    //

    // detail-page person
    detailPersonDataSource: JSON = null;
    detailGeschaeftspartnerDataSourceForPerson: JSON = null;
    initDetailPerson() {
      var id: number = this.getParameter("id");
      /*alert(id + table)*/
      this.person.getDetailPerson(id)
        .success((data): void => {
        this.detailPersonDataSource = data[0];
        console.log(this.detailPersonDataSource);
      })
        .error((data): void => {
        console.log("Keine DetailDaten bekommen.")
      });
      this.person.getDetailGeschaeftspartnerForPerson(id)
        .success((data): void => {
        console.log(data[0]);
        this.detailGeschaeftspartnerDataSourceForPerson = data[0];
      })
        .error((data): void => {
        console.log("Keine DetailDaten bekommen.");
      });
    }

    getParameter = (theParameter): any => {
      var params = window.location.search.substr(1).split('&');
      for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        if (p[0] == theParameter) {
          return decodeURIComponent(p[1]);
        }
      }
      return false;
    }

    //
    // Personen Page
    //
    dataSourcePerson: JSON = null;
    initPerson() {
      this.person.getPerson()
        .success((data): void => {
        this.dataSourcePerson = data;
      })
        .error((data): void => {
        console.log("Keine Personen bekommen.");
      });
    }

    gridPerson: any = {
      loadPanel: false,
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
      rowClick: (options): void => {
        window.location.href = "http://localhost:3000/detail/detailPerson?id=" + options.data.Id;
      }
    }
  }

  export interface PersonScope extends ng.IScope {
    vm: PersonViewModel;
  }

  export class PersonCtrl {
    constructor(private person: PersonService, public $scope: PersonScope) {
      $scope.vm = new PersonViewModel(person);
    }
  }

  angular
    .module("tip")
    .controller("PersonCtrl", ["PersonService", "$scope", PersonCtrl]);
}
