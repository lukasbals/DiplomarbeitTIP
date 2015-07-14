module DREIER{
  export interface TestScope extends ng.IScope{
    vorname: string;
    nachname: string;
    getProduct(id: number):void;
  }
  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.getProduct = (): void => {
        this.test.getProduct($scope.vorname);
      };
    }
  }

  angular
    .module("dreier")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
