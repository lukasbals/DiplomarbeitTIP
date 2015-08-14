module TIP {
  export class BesuchPlanViewModel {
    constructor(private besuchPlan: BesuchPlanService) {

    }

    currentDate: Date = new Date();

    dataSourceGeschaeftspartnerForSearch: IGpStammModel = null;
    detailBesuchPlanDataSource: TIP.IBesuchPlanDetailModel = null;
    gpId: number = null;
    startDate: Date = null;
    endDate: Date = null;

    initDetailBesuchPlan() {
      this.currentDate = new Date(this.getParameter("startDate"));
      this.besuchPlan.getAllGeschaeftspartnerForSearch()
        .success((data): void => {
        this.dataSourceGeschaeftspartnerForSearch = data;
      });
      var id: number = this.getParameter("id");
      if (id >= 0) {
        //alert("ändern");
        this.besuchPlan.getDetailBesuchPlan(id)
          .success((data): void => {
          //console.log(data);
          this.besuchPlan.parse(data[0]);
          this.detailBesuchPlanDataSource = data[0];
          this.startDate = new Date(data[0].startDate);
          this.endDate = new Date(data[0].endDate);
          this.gpId = data[0].IdGeschaeftspartner;
          console.log(this.detailBesuchPlanDataSource);
        });
      } else {
        this.startDate = new Date(this.getParameter("startDate"));
        this.endDate = new Date(this.getParameter("endDate"));
        //alert("Neues Ereignis");
      }
    }

    lookup = {
      placeholder: "Geschäftspartner ändern...",
      bindingOptions: {
        dataSource: "vm.dataSourceGeschaeftspartnerForSearch",
      },
      displayExpr: "Firmenbez1",
      title: "Geschäftspartner",
      onValueChanged: (options): void => {
        this.gpId = options.itemData.Id;
      }
    }

    dateboxAnfang = {
      format: "datetime",
      // value: this.startDate
      bindingOptions: {
        value: "vm.startDate"
      },
      onClosed: (option): void => {
        this.startDate = option.model.vm.startDate;
      }
    }

    dateboxEnde = {
      format: "datetime",
      // value: this.endDate
      bindingOptions: {
        value: "vm.endDate"
      },
      onClosed: (option): void => {
        // this.endDate = options;
        this.endDate = option.model.vm.endDate;
      }
    }

    loeschen: DevExpress.ui.dxButtonOptions = {
      type: "danger",
      text: "Löschen",
      onClick: (): void => {
        this.besuchPlan.deleteBesuchPlanAppointment(this.detailBesuchPlanDataSource.ClientId);
        window.location.href = "/besuchPlan";
      }
    }

    update: DevExpress.ui.dxButtonOptions = {
      type: "success",
      text: "Speichern",
      onClick: (): void => {
        this.besuchPlan.updateBesuchPlanAppointment(this.gpId, this.startDate, this.endDate, this.detailBesuchPlanDataSource.ClientId)
          .success((data): void => {
          window.location.href = "/besuchPlan";
        });

      }
    }

    save: DevExpress.ui.dxButtonOptions = {
      type: "success",
      text: "Speichern",
      onClick: (): void => {
        this.besuchPlan.saveBesuchPlanAppointment(this.gpId, this.startDate, this.endDate)
          .success((data): void => {
          //DevExpress.ui.notify("Sie haben den Termin gespeichert.", "success", 3000);
          window.location.href = "/besuchPlan";
        });
      }
    }

    cancel: DevExpress.ui.dxButtonOptions = {
      text: "Abbrechen",
      onClick: (): boolean => {
        history.go(-1);
        return true;
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

    schedulerBesuchPlan: any = {
      bindingOptions: {
        dataSource: "vm.dataSourceBesuchPlan",
        currentDate: "vm.currentDate"
      },
      views: ["workWeek", "day"],
      currentView: "workWeek",
      startDayHour: 7,
      endDayHour: 19,
      width: "100%",
      height: "100%",
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
