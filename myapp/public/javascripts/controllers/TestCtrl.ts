module TIP {
  export interface TestScope extends ng.IScope {
    vorname: string;
    nachname: string;

    getID(id: number): void;
  }

  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.getID = (): void => {
        this.test.getID($scope.idInput);
      };
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
