module TIP {
  export class BesuchPlanViewModel {
    constructor(private besuchPlan: BesuchPlanService, private json: JsonService) {

    }

    dataSourceBesuchPlan: TIP.ISchedulerData = null;
    initBesuchPlan() {
      this.besuchPlan.getBesuchPlan()
        .success((data): void => {
        this.json.parse(data);
        this.dataSourceBesuchPlan = data;

        // this.dataSourceBesuchPlan = [
        //   {
        //     text: "Website Re-Design Plan",
        //     startDate: ("2015-08-05T09:00:00"),
        //     endDate: ("2015-08-05T10:00:00")
        //   }
        // ];
        console.log(this.dataSourceBesuchPlan);
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
      currentDate: new Date(2015, 7, 3),
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
    constructor(private besuchPlan: BesuchPlanService, private json: JsonService, public $scope: BesuchPlanScope) {
      $scope.vm = new BesuchPlanViewModel(besuchPlan, json);
    }
  }

  angular
    .module("tip")
    .controller("BesuchPlanCtrl", ["BesuchPlanService", "$scope", "JsonService", BesuchPlanCtrl]);
}
