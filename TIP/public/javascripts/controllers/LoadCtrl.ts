module TIP {
  export class LoadViewModel {
    constructor(private loading: LoadService) {

    }

    isLoading: boolean = false;
    initIsLoading() {
      setInterval((): void => {
        this.loading.getIsSyncActive()
          .success((data): void => {
          //console.log(data);
          this.isLoading = data;
        }).error((data): void=> {
          alert("Irgendwas beim isLoading is schief gelaufen");
        });
      }, 1000);
    }

    synchButton() {
      this.loading.synchDB()
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
    constructor(private loading: LoadService, public $scope: LoadScope) {
      $scope.vm = new LoadViewModel(loading);
    }
  }

  angular
    .module("tip")
    .controller("LoadCtrl", ["LoadService", "$scope", LoadCtrl]);
}
