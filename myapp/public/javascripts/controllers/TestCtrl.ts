module TIP {
  export interface TestScope extends ng.IScope {
    vorname: string;
    nachname: string;
    id: string;

    contents: JSON;

    data: JSON;

    getID(id: string): void;
    getData(): void;
  }

  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.getID = (): void => {
        this.test.getID($scope.id)
          .success(function(data) {
          /*var dataString: string = JSON.stringify(data);
          alert(dataString);*/

          $scope.contents = data;
        })
          .error(function(data) {
          alert("User nicht gefunden");
        });
      };

      $scope.getData = (): void => {
        this.test.getData();
      };
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
