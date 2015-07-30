module TIP {
  export class LoadViewModel {
    constructor(private my: MyService) {

    }
    synchDB: boolean = false;
    synchButton() {
      this.synchDB = true;
      this.my.synchDB()
        .success((): void=> {
          console.log("success");
      })
        .error((): void=> {
        alert("Fehler beim Datenbanken Synchronisieren");
      });
    }
  }

  export interface LoadScope extends ng.IScope {
    vm: LoadViewModel;
  }

  export class LoadCtrl {
    constructor(private my: MyService, public $scope: LoadScope) {
      $scope.vm = new LoadViewModel(my);
    }
  }

  angular
    .module("tip")
    .controller("LoadCtrl", ["MyService", "$scope", LoadCtrl]);
}
