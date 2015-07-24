module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }
    dataSource: any = null;


    getGeschaeftspartner: DevExpress.ui.dxButtonOptions = {
      text: "getGeschaeftspartner",
      onClick: (): void => {
        DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!");
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
      columns: [{
        dataField: 'GpNummer',
        width:50
      }, {
          dataField: 'Firmenbez1',
          width: 200
        }, {
          dataField: 'Firmenbez2',
          width: 150
        }, {
          dataField: 'Strasse',
          width: 200
        }, {
          dataField: 'Plz'
        }, {
          dataField: 'Ort'
        }, {
          dataField: 'Telefon'
        }, {
          dataField: 'Email'
        }],
      columnAutoWidth: true,
      bindingOptions: {
        dataSource: "vm.dataSource"
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
