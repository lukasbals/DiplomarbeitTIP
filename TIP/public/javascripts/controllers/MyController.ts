module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }
    tipData: JSON;

    getGeschaeftspartner: DevExpress.ui.dxButtonOptions = {
      text: "getGeschaeftspartner",
      onClick: (): void => {
        DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!");
        this.my.getGeschaeftspartner()
          .success(function(data) {
          console.log(data);
          data = this.tipData;
        })
          .error(function(data) {
          console.log("Keine Geschaeeftspartner bekommen.");
        });

      }
    }


    gridGeschaeftspartner: DevExpress.ui.dxDataGridOptions = {
      dataSource: this.tipData,
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
      ]
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
