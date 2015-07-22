module TIP {
  export class MyViewModel {
    constructor(private my: MyService) {

    }
    vorname: string;
    nachname: string;

    firstNameConfig: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Vorname",
      bindingOptions: {
        value: "vm.vorname"
      }
    }
    lastNameConfig: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Nachname",
      bindingOptions: {
        value: "vm.nachname"
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
