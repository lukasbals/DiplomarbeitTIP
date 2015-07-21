module TIP {
  export class IViewModel {
    constructor(private IController: IService) {

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
