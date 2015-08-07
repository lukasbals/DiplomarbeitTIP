module TIP {
  export class BesuchPlanViewModel {
    constructor(private besuchPlan: BesuchPlanService) {

    }

    dataSourceBesuchPlan: TIP.ISchedulerData = null;
    initBesuchPlan() {
      this.besuchPlan.getBesuchPlan()
        .success((data): void => {
        this.besuchPlan.parse(data);
        this.dataSourceBesuchPlan = data;

        //console.log(this.dataSourceBesuchPlan);
      })
        .error((data): void => {
        console.log("Keine BesuchPlane bekommen.");
      });
    }

    schedulerBesuchPlan: any = {
      bindingOptions: {
        dataSource: "vm.dataSourceBesuchPlan"
      },
      views: ["workWeek", "day"],
      currentView: "workWeek",
      currentDate: new Date(2012, 1, 3),
      // firstDayOfWeek: 1,
      startDayHour: 8,
      endDayHour: 19,
      width: "100%",
      height: 600
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
