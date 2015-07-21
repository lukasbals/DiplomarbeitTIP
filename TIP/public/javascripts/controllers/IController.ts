module TIP {
  export class IViewModel {
    constructor(private IController: IService) {

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
  }
  export interface IScope extends ng.IScope {
    vm: IViewModel;
  }

  export class IController {
    constructor(private IController: IService, public $scope: IScope) {
      $scope.vm = new IViewModel(IController);
    }
  }

  angular
    .module("tip")
    .controller("IController", ["IController", "$scope", IController]);
}
