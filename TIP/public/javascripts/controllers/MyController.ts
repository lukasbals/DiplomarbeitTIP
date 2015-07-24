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
      ],
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
