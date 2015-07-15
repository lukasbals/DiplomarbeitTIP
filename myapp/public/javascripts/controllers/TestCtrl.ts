module TIP {
  export interface TestScope extends ng.IScope {
    vorname: string;
    nachname: string;
    id: number;
    contents: JSON;

    getID(id: number): void;
  }

  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.getID = (): void => {
        this.test.getID($scope.id)
          .success(function(data){
            var d: string = JSON.stringify(data);
            alert(d);
            $scope.contents = data[0];
          }).
          error(function(data){
          });
      };
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
