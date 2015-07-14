module TIP {
  export interface TestScope extends ng.IScope {
    vorname: string;
    nachname: string;
    id: number;

    getID(id: number): void;
  }

  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.getID = (): void => {
        this.test.getID($scope.id);
      };
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
