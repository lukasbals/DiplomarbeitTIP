module TIP {
  export class IViewModel {
    constructor(private i: IService) {

    }


  }
  export interface TestScope extends ng.IScope {
    vm: IViewModel;
  }

  export class TestCtrl {
    constructor(private i: IService, public $scope: IScope) {
      $scope.vm = new IViewModel(i);
    }
  }

  angular
    .module("tip")
    .controller("IController", ["I", "$scope", IController]);
}
