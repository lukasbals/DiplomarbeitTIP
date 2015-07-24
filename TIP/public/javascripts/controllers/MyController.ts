module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }

    getGeschaeftspartner: DevExpress.ui.dxButtonOptions = {
      text: "getGeschaeftspartner",
      onClick: (): void => {
        DevExpress.ui.notify("Du hast den getGeschaeftspartner-Button geklickt!");
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
