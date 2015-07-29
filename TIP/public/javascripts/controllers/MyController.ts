module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }

    // Displays the loadIndicator if it is true
    loadIndicator: boolean = false;

    //
    // Detail Page
    //
    detailGeschaeftspartnerDataSource: JSON = null;
    pathBarAttribute: string = null;
    initDetailGeschaeftspartner() {
      this.loadIndicator = true;
      var id: number = this.getParameter("id");
      /*alert(id + table)*/
      this.my.getGeschaeftspartnerDetail(id)
        .success((data): void => {
        this.pathBarAttribute = data[0].firmenbez_1;
        this.detailGeschaeftspartnerDataSource = data;
        console.log(this.detailGeschaeftspartnerDataSource);
        this.loadIndicator = false;
      })
        .error((data): void => {
        console.log("Keine DetailDaten bekommen.")
        this.loadIndicator = false;
      });
    }

    detailGeschaeftspartnerOption = {
      bindingOptions: {
        dataSource: "vm.detailGeschaeftspartnerDataSource"
      },
      loadPanel: false
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
    // Geschäftspartner Page
    //
    dataSourceGeschaeftspartner: JSON = null;
    initGeschaeftspartner() {
      this.loadIndicator = true;
      this.my.getGeschaeftspartner()
        .success((data): void => {
        this.dataSourceGeschaeftspartner = data;
        this.loadIndicator = false;
      })
        .error((data): void => {
        console.log("Keine Geschaeeftspartner bekommen.");
        this.loadIndicator = false;
      });
    }

    gridGeschaeftspartner: any = {
      loadPanel: false,
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
      searchPanel: {
        visible: true,
        width: 250,
        highlightSearchText: false
      },
      rowClick: (options): void => {
        this.loadIndicator = true;
        window.location.replace("http://localhost:3000/detail/detailGeschaeftspartner?id=" + options.data.Id);
      }
    }

    //
    // Personen Page
    //
    dataSourcePerson: JSON = null;
    initPerson() {
      this.loadIndicator = true;
      this.my.getPerson()
        .success((data): void => {
        this.dataSourcePerson = data;
        this.loadIndicator = false;
      })
        .error((data): void => {
        console.log("Keine Personen bekommen.");
        this.loadIndicator = false;
      });
    }


    gridPerson: any = {
      loadPanel: false,
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
      searchPanel: {
        visible: true,
        width: 250,
        highlightSearchText: false
      },
      rowClick: (options): void => {
        this.loadIndicator = true;
        window.location.replace("http://localhost:3000/details?id=" + options.data.Id + "&table=" + "personen_st");
      }
    }
  }

  export interface MyScope extends ng.IScope {
    vm: MyViewModel;
  }

  export class MyController {
    constructor(private my: MyService, public $scope: MyScope) {
      $scope.vm = new MyViewModel(my);
    }
  }

  angular
    .module("tip")
    .controller("MyController", ["MyService", "$scope", MyController]);
}
