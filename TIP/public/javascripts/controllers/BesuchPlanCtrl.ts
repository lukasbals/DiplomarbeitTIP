module TIP {
  export class BesuchPlanViewModel {
    constructor(private besuchPlan: BesuchPlanService) {

    }
    dataSourceBesuchPlan = null;

    ;
    initBesuchPlan() {
      this.besuchPlan.getBesuchPlan()
        .success((data): void => {
        this.dataSourceBesuchPlan = [
          {
            text: "Website Re-Design Plan",
            startDate: new Date("2015-08-05T09:00:00"),
            endDate: new Date("2015-08-05T10:00:00")
          }
        ];
        console.log(this.dataSourceBesuchPlan);
      })
        .error((data): void => {
        console.log("Keine BesuchPlane bekommen.");
      });
    }

    schedulerBesuchPlan = {
      bindingOptions: {
        dataSource: "vm.dataSourceBesuchPlan"
      },
      views: ["month", "week", "workWeek", "day"],
      currentView: "workWeek",
      currentDate: new Date(),
      firstDayOfWeek: 1,
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