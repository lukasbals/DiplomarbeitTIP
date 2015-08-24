module TIP {
  export class BesuchViewModel {
    constructor(private besuch: BesuchService) {

    }

    currentDate: Date = new Date();

    dataSourceGeschaeftspartnerForSearch: IGpStammModel = null;
    dataSourceBesuchstypForSearch: IBesuchstypModel = null;
    detailBesuchDataSource: TIP.IBesuchDetailModel = null;
    besuchId: number = null;
    geschaeftspartnerId: number = null;
    besuchstypId: number = null;
    startDate: Date = null;
    endDate: Date = null;
    gpName: string = null;

    initDetailBesuch() {
      this.besuch.getAllGeschaeftspartnerForSearch()
        .success((data): void => {
        this.dataSourceGeschaeftspartnerForSearch = data;
      });
      this.besuch.getAllBesuchstypForSearch()
        .success((data): void => {
        this.dataSourceBesuchstypForSearch = data;
      });
      var id: number = this.getParameter("id");
      if (id >= 0) {
        //alert("ändern");
        this.besuch.getDetailBesuch(id)
          .success((data): void => {
          //console.log(data);
          this.besuch.parse(data[0]);
          this.detailBesuchDataSource = data[0];
          this.startDate = new Date(data[0].startDate);
          this.endDate = new Date(data[0].endDate);
          this.besuchId = data[0].ClientId;
          this.geschaeftspartnerId = data[0].IdGeschaeftspartner;
          this.besuchstypId = data[0].IdBesuchstyp;
          this.gpName = data[0].Firmenbez1;
          console.log(this.detailBesuchDataSource);
        });
      } else {
        this.geschaeftspartnerId = this.getParameter("IdGeschaeftspartner");
        if (this.geschaeftspartnerId >= 0) {
          this.besuch.getDetailGeschaeftspartner(this.geschaeftspartnerId)
            .success((data): void => {
            this.gpName = data[0].Firmenbez1;
          });
        }
        this.startDate = new Date(this.getParameter("startDate"));
        this.endDate = new Date(this.getParameter("endDate"));
        //alert("Neues Ereignis");
      }
    }

    lookupGeschaeftspartner = {
      placeholder: "Geschäftspartner ändern...",
      bindingOptions: {
        dataSource: "vm.dataSourceGeschaeftspartnerForSearch",
      },
      displayExpr: "Firmenbez1",
      title: "Geschäftspartner",
      onValueChanged: (options): void => {
        this.geschaeftspartnerId = options.itemData.Id;
      }
    }

    lookupBesuchstyp = {
      placeholder: "Besuchstyp ändern...",
      bindingOptions: {
        dataSource: "vm.dataSourceBesuchstypForSearch",
      },
      displayExpr: "Bezeichnung",
      title: "Besuchstypen",
      onValueChanged: (options): void => {
        this.besuchstypId = options.itemData.Id;
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
        this.besuch.deleteBesuchAppointment(this.detailBesuchDataSource.ClientId);
        window.location.href = "/Besuch";
      }
    }

    update: DevExpress.ui.dxButtonOptions = {
      type: "success",
      text: "Speichern",
      onClick: (): void => {
        this.besuch.updateBesuchAppointment(this.geschaeftspartnerId, this.besuchstypId, this.startDate, this.endDate, this.detailBesuchDataSource.ClientId)
          .success((data): void => {
          window.location.href = "/Besuch";
        });

      }
    }

    save: DevExpress.ui.dxButtonOptions = {
      type: "success",
      text: "Speichern",
      onClick: (): void => {
        this.besuch.saveBesuchAppointment(this.geschaeftspartnerId, this.besuchstypId, this.startDate, this.endDate)
          .success((data): void => {
            console.log(data);
            // this.besuch.saveBerichtAppointment()
          //DevExpress.ui.notify("Sie haben den Termin gespeichert.", "success", 3000);
          //window.location.href = "/Besuch";
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

    berichtHeadingContent = null;
    berichtHeading: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Titel ...",
      onChange: (): void=> {
        console.log(this.berichtHeadingContent);
      }
    }

    berichtContentContent = null;
    berichtContent: DevExpress.ui.dxTextAreaOptions = {
      placeholder: "Bericht ... ",
      height: 100,
      onChange: (): void=> {
        console.log(this.berichtContentContent);
      }
    }

    // saveBericht: DevExpress.ui.dxButtonOptions = {
    //   text: "Bericht speichern",
    //   type: "success",
    //   onClick: (): void => {
    //
    //   }
    // }

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

    dataSourceBesuch: TIP.ISchedulerData = null;
    initBesuch() {
      this.besuch.getBesuch()
        .success((data): void => {
        this.besuch.parse(data);
        this.dataSourceBesuch = data;
      })
        .error((data): void => {
        console.log("Keine Besuche bekommen.");
      });
    }

    schedulerBesuch: any = {
      bindingOptions: {
        dataSource: "vm.dataSourceBesuch",
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
        this.besuch.deleteBesuchAppointment(id);
      },
      onAppointmentUpdated: (options): void => {
        var id_besuchstyp: number = options.appointment.IdBesuchstyp;
        var id_geschaeftspartner: number = options.appointment.IdGeschaeftspartner;
        var startDate: Date = options.appointment.startDate;
        var endDate: Date = options.appointment.endDate;
        var id: number = options.appointment.ClientId;
        this.besuch.updateBesuchAppointment(id_geschaeftspartner, id_besuchstyp, startDate, endDate, id);
      }
    }
  }

  export interface BesuchScope extends ng.IScope {
    vm: BesuchViewModel;
  }

  export class BesuchCtrl {
    constructor(private besuch: BesuchService, public $scope: BesuchScope) {
      $scope.vm = new BesuchViewModel(besuch);
    }
  }

  angular
    .module("tip")
    .controller("BesuchCtrl", ["BesuchService", "$scope", BesuchCtrl]);
}
