module TIP {
  export class TestViewModel {
    constructor(private test: TestService) {

    }

    vorname: string;
    nachname: string;

    vornameConfig: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Vorname",
      bindingOptions: {
        value: "vm.vorname"
      }
    }
    nachnameConfig: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Nachname",
      bindingOptions: {
        value: "vm.nachname"
      }
    }
    doSomethingConfig: DevExpress.ui.dxButtonOptions = {
      text: "Do Something",
      onClick: (): void => {
        DevExpress.ui.notify("Hallo " + this.vorname + " " + this.nachname, "info", 2000);
      }
    }

  }

  export interface TestScope extends ng.IScope {
    vm: TestViewModel;

  }

  export class NewCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.vm = new TestViewModel(test);
    }
  }
  angular
    .module("tip")
    .controller("NewCtrl", ["Test", "$scope", NewCtrl]);
}
