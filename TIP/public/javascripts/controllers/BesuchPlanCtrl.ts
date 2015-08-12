module TIP {
  export class BesuchPlanViewModel {
    constructor(private besuchPlan: BesuchPlanService) {

    }

    detailBesuchPlanDataSource: TIP.IBesuchPlanDetailModel = null;
    startDate: Date = null;
    endDate: Date = null;
    initDetailBesuchPlan() {
      var id: number = this.getParameter("id");
      var startDate: Date = this.getParameter("startDate");
      var endDate: Date = this.getParameter("endDate");
      //alert(id);
      if (id >= 0) {
        //alert("ändern");
        this.besuchPlan.getDetailBesuchPlan(id)
          .success((data): void => {
          console.log(data);
          this.besuchPlan.parse(data);
          this.detailBesuchPlanDataSource = data[0];
          this.startDate = data[0].startDate;
          this.endDate = data[0].endDate;
          alert(this.endDate);
        });
      } else {
        this.startDate = startDate;
        this.endDate = endDate;
        //alert("Neues Ereignis");
      }
    }

    getParameter = (theParameter): any => {
      var params = window.location.search.substr(1).split('&');
      for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        if (p[0] == theParameter) {
          return decodeURIComponent(p[1]);
        }
      }
      return false;
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
      onAppointmentDeleted: (options): void => {
        console.log(options.appointment);
        var id: number = options.appointment.ClientId;
        this.besuchPlan.deleteBesuchPlanAppointment(id);

      },
      onAppointmentUpdated: (options): void => {
        var id_geschaeftspartner: number = options.appointment.IdGeschaeftspartner;
        var startDate: Date = options.appointment.startDate;
        var endDate: Date = options.appointment.endDate;
        var id: number = options.appointment.ClientId;

        this.besuchPlan.updateBesuchPlanAppointment(id_geschaeftspartner, startDate, endDate, id);
      }
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
