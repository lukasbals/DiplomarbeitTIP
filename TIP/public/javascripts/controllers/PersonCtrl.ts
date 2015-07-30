module TIP {
  export class PersonViewModel {
    constructor(private person: PersonService) {

    }
    //
    // Detail Page
    //

    // detail-page person
    detailPersonDataSource: JSON = null;
    initDetailPerson() {
      var id: number = this.getParameter("id");
      /*alert(id + table)*/
      this.person.getDetailPerson(id)
        .success((data): void => {
        this.detailPersonDataSource = data[0];
      })
        .error((data): void => {
        console.log("Keine DetailDaten bekommen.")
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
      //loadPanel: false,
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
