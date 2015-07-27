module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }
    dataSource: any = null;

    i = function() {
      window.location.replace("http://localhost:3000/geschaeftspartner");
    }

    getGeschaeftspartner: DevExpress.ui.dxButtonOptions = {
      text: "Geschäftspartner",
      activeStateEnabled:false,
      focusStateEnabled:false,
      hoverStateEnabled:false,
      onClick: (): void => {
        /*this.i();*/
        //window.location.href = "http://localhost:3000/geschaeftspartner";
        DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!", "success", 2000);
        this.my.getGeschaeftspartner()
          .success((data): void => {
          console.log(data);
          this.dataSource = data;
        })
          .error((data): void => {
          console.log("Keine Geschaeeftspartner bekommen.");
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
        dataSource: "vm.dataSource"
      },
      searchPanel: {
        visible: true,
        width: 250,
        highlightSearchText: false
      },
      rowClick: (): void => {
        alert(this.dataSource.GpNummer);
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
