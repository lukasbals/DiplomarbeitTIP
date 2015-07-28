module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }

    // Displays the homePage if it is true
    homePage: boolean = true;

    // Displays the loadIndicator if it is true
    loadIndicator: boolean = false;

    // the one who is not null is visible
    dataSourceGeschaeftspartner: any = null;
    dataSourcePerson: any = null;


    getGeschaeftspartner: DevExpress.ui.dxButtonOptions = {
      text: "Geschäftspartner",
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onClick: (): void => {
        this.loadIndicator = true;
        this.my.getGeschaeftspartner()
          .success((data): void => {
          //console.log(data);
          this.dataSourcePerson = null;
          this.dataSourceGeschaeftspartner = data;
          this.loadIndicator = false;
          this.homePage = false;
        })
          .error((data): void => {
          console.log("Keine Geschaeeftspartner bekommen.");
          this.loadIndicator = false;
        });
      }
    }

    getPerson: DevExpress.ui.dxButtonOptions = {
      text: "Personen",
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onClick: (): void => {
        this.loadIndicator = true;
        //DevExpress.ui.notify("Du hast den getPersonen-Button geklickt!", "success", 2000);
        this.my.getPerson()
          .success((data): void => {
          //console.log(data);
          this.dataSourceGeschaeftspartner = null;
          this.dataSourcePerson = data;
          this.loadIndicator = false;
          this.homePage = false;
        })
          .error((data): void => {
          console.log("Keine Personen bekommen.");
          this.loadIndicator = false;
        });
      }
    }

    gridGeschaeftspartner: any = {
      /*selection: {
        mode: 'single'
      },*/
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
        this.my.postDetail(options.data.Id);
        /*console.log(options.data);*/

      }
    }

    gridPerson: any = {
      /*selection: {
        mode: 'single'
      },*/
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
        this.my.postDetail(options.data);
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
