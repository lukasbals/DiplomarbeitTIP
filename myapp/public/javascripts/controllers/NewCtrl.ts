module TIP {
  export class TestViewModel {
    constructor(private test: TestService) {

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
