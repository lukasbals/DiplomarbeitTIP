module TIP {
  export class IViewModel {
    constructor(private IController: IService) {

    }


  }
  export interface TestScope extends ng.IScope {
    vm: IViewModel;
  }

  export class TestCtrl {
    constructor(private IController: IService, public $scope: IScope) {
      $scope.vm = new IViewModel(IController);
    }
  }

  angular
    .module("tip")
    .controller("IController", ["IController", "$scope", IController]);
}
