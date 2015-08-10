module TIP {
  export class PopUpBesuchPlanViewModel {
    constructor(private PopUpBesuchPlan: PopUpBesuchPlanService) {

    }
  }

  export interface PopUpBesuchPlanScope extends ng.IScope {
    vm: PopUpBesuchPlanViewModel;
  }

  export class PopUpBesuchPlanCtrl {
    constructor(private PopUpBesuchPlan: PopUpBesuchPlanService, public $scope: PopUpBesuchPlanScope) {
      $scope.vm = new PopUpBesuchPlanViewModel(PopUpBesuchPlan);
    }
  }

  angular
    .module("tip")
    .controller("PopUpBesuchPlanCtrl", ["PopUpBesuchPlanService", "$scope", PopUpBesuchPlanCtrl]);
}
