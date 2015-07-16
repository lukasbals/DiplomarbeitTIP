module TIP {
  export interface TestScope extends ng.IScope {
    vorname: string;
    nachname: string;
    id: string;

    contents: JSON;

    databases: JSON;

    getID(id: string): void;
    getData(): void;
  }

  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.getID = (): void => {
        this.test.getID($scope.id)
          .success(function(data) {
          $scope.contents = data;
        })
          .error(function(data) {
          alert("User nicht gefunden");
        });
      };

      $scope.getData = (): void => {
        this.test.getData()
          .success(function(data) {
          $scope.databases = data;
        })
          .error(function(data) {
          alert("Keine Daten gefunden auf der Datenbank");
        });
      };
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
