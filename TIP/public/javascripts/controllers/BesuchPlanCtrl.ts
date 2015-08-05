module TIP {
  export class BesuchPlanViewModel {
    constructor(private besuchPlan: BesuchPlanService) {

    }

    dataSourceBesuchPlan: JSON = null;
    initBesuchPlanPlan() {
      this.besuchPlan.getBesuchPlan()
        .success((data): void => {
        this.dataSourceBesuchPlan = data;
        console.log(this.dataSourceBesuchPlan)
      })
        .error((data): void => {
        console.log("Keine BesuchPlane bekommen.");
      });
    }

}

  export interface BesuchPlanScope extends ng.IScope {
    vm: BesuchPlanViewModel;
  }

  export class BesuchPlanCtrl {
    constructor(private besuchPlan: BesuchPlanService, public $scope: BesuchPlanScope) {
      $scope.vm = new BesuchPlanViewModel(besuchPlan);
    }
  }

  angular
    .module("tip")
    .controller("BesuchPlanCtrl", ["BesuchPlanService", "$scope", BesuchPlanCtrl]);
}
