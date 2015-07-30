module TIP {
  export class LoadViewModel {
    constructor(private my: LoadService) {

    }
    synchDB: boolean = false;
    synchButton() {
      this.synchDB = true;
      this.my.synchDB()
        .success((): void=> {
          console.log("success");
      })
        .error((): void=> {
        alert("Fehler beim Synchronisieren der Datenbanken");
      });
    }
  }

  export interface LoadScope extends ng.IScope {
    vm: LoadViewModel;
  }

  export class LoadCtrl {
    constructor(private my: LoadService, public $scope: LoadScope) {
      $scope.vm = new LoadViewModel(my);
    }
  }

  angular
    .module("tip")
    .controller("LoadCtrl", ["LoadService", "$scope", LoadCtrl]);
}
