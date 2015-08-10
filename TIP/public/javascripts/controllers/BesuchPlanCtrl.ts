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
      })
        .error((data): void => {
        console.log("Keine BesuchPlane bekommen.");
      });
    }

    myTemplate;

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
      height: "100%",
      onAppointmentAdding: (options): void => {
        console.log(options.appointment.text + options.appointment.startDate);
        DevExpress.ui.notify(options.Betreff, "success", 1000);
      },
      template: "vm.myTemplate"
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
