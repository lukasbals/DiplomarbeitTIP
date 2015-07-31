module TIP {
  export class LoadViewModel {
    constructor(private my: LoadService) {

    }
    /*synchDB: boolean = false;
    state: string = document.readyState;
    setInterval = (() => {
      if(state == "loading"){
        this.synchDB = true;
      }else{
        this.synchDB = false;
      }
    }, 1000)*/

    /*vm.start = () => {

    }*/

    loadIndicator: boolean = false;

    synchButton() {
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
