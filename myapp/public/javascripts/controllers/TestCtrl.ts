module TIP {
  export interface TestScope extends ng.IScope {
    getID(id: string): void;
    vorname: string;
    nachname: string;
    id: string;
    contents: JSON;

    getData(): void;
    databases: JSON;

    init(): void;
    teams: JSON;
    insertTeam(team: string, country: string): void;
    team: string;
    country: string;
    deleteTeam(id: number): void;
    //delete: number;
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

      $scope.init = (): void => {
        this.test.init()
          .success(function(data) {
          $scope.teams = data;
        })
          .error(function() {
          alert("Es ist ein Fehler passiert!");
        });
      };

      $scope.insertTeam = (): void => {
        this.test.insertTeam($scope.team, $scope.country)
          .success(function() {
          alert("success");
        })
          .error(function() {
          alert("error");
        });
      };

      $scope.deleteTeam = (id): void => {
        /*alert(id);*/
        this.test.deleteTeam(id);
      }
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
