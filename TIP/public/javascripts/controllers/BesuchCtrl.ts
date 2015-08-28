module TIP {
  export class BesuchViewModel {
    constructor(private besuch: BesuchService) {

    }

    currentDate: Date;

    dataSourceGeschaeftspartnerForSearch: IGpStammModel = null;
    dataSourceBesuchstypForSearch: IBesuchstypModel = null;
    dataSourceBericht: IBerichtModel = null;
    detailBesuchDataSource: TIP.IBesuchDetailModel = null;
    geschaeftspartnerId: number = null;
    besuchstypId: number = null;
    startDate: Date = null;
    endDate: Date = null;
    gpName: string = null;
    neuerBericht: boolean = false;

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
          // this.besuchId = data[0].ClientId;
          this.geschaeftspartnerId = data[0].IdGeschaeftspartner;
          this.besuchstypId = data[0].IdBesuchstyp;
          this.gpName = data[0].Firmenbez1;
          console.log(this.detailBesuchDataSource);
          var idForBericht: number = null;
          var isOnServer: string = null;
          if (this.detailBesuchDataSource.Id != null) {
            idForBericht = this.detailBesuchDataSource.Id;
            isOnServer = "id_besuch";
          } else {
            idForBericht = this.detailBesuchDataSource.ClientId;
            isOnServer = "client_id_besuch";
          }
          this.besuch.getBerichtById(idForBericht, isOnServer)
            .success((data): void => {
            console.log(data);
            this.dataSourceBericht = data;
            if (this.dataSourceBericht[0] == null) {
              this.neuerBericht = true;
            }
          });
        });
      } else {
        this.neuerBericht = true;
        this.geschaeftspartnerId = this.getParameter("IdGeschaeftspartner");
        if (this.geschaeftspartnerId >= 0) {
          this.besuch.getDetailGeschaeftspartner(this.geschaeftspartnerId)
            .success((data): void => {
            this.gpName = data[0].Firmenbez1;
          });
        }
        this.startDate = new Date(this.getParameter("startDate"));
        this.endDate = new Date(this.getParameter("endDate"));
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
        window.location.href = "/Besuch?currentDate=" + this.startDate;
      }
    }

    update: DevExpress.ui.dxButtonOptions = {
      type: "success",
      text: "Speichern",
      onClick: (): void => {
        var idForUpdate: number;
        var isOnServer: string;
        if (this.detailBesuchDataSource.Id == null) {
          idForUpdate = this.detailBesuchDataSource.ClientId;
          isOnServer = "client_id";
        } else {
          idForUpdate = this.detailBesuchDataSource.Id;
          isOnServer = "id";
        }
        var updateBesuchAppointmentData: IUpdateBesuchAppointmentModel[] = new Array();
        updateBesuchAppointmentData.push({
          IdGeschaeftspartner: this.geschaeftspartnerId,
          IdBesuchstyp: this.besuchstypId,
          startDate: this.startDate,
          endDate: this.endDate,
          idForUpdate: idForUpdate,
          berichtHeadingContent: this.berichtHeadingContent,
          berichtContentContent: this.berichtContentContent,
          isOnServer: isOnServer
        });
        this.besuch.updateBesuchAppointment(updateBesuchAppointmentData)
          .success((data): void => {
          this.currentDate = this.startDate;
          window.location.href = "/Besuch?currentDate=" + this.startDate;
        });
        this.besuch.updateBericht(this.dataSourceBericht)
          .success((data): void => {
          console.log("success");
        });

      }
    }

    save: DevExpress.ui.dxButtonOptions = {
      type: "success",
      text: "Speichern",
      onClick: (): void => {
        var saveBesuchAppointmentData: ISaveBesuchAppointmentModel[] = new Array();
        saveBesuchAppointmentData.push({
          IdGeschaeftspartner: this.geschaeftspartnerId,
          IdBesuchstyp: this.besuchstypId,
          startDate: this.startDate,
          endDate: this.endDate,
          berichtHeadingContent: this.berichtHeadingContent,
          berichtContentContent: this.berichtContentContent
        });
        this.besuch.saveBesuchAppointment(saveBesuchAppointmentData)
          .success((data): void => {
          // console.log(data);
          this.currentDate = this.startDate;
          window.location.href = "/Besuch?currentDate=" + this.startDate;
        });
      }
    }

    cancel: DevExpress.ui.dxButtonOptions = {
      text: "Abbrechen",
      onClick: (): boolean => {
        this.currentDate = this.startDate;
        window.location.href = "/Besuch?currentDate=" + this.startDate;
        return true;
      }
    }

    deleteBericht: DevExpress.ui.dxButtonOptions = {
      text: "X",
      type: "danger",
      width: "100%",
      onClick: (data): void => {
        //console.log(data.model.bericht.ClientId);
        this.besuch.deleteBericht(data.model.bericht.ClientId)
          .success((data): void => {
          history.go(0);
        });
      }
    }

    berichtHeadingContent: string = null;
    berichtHeading: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Titel ...",
      onChange: (): void=> {
        // console.log(this.berichtHeadingContent);
      }
    }

    berichtContentContent: string = null;
    berichtContent: DevExpress.ui.dxTextAreaOptions = {
      placeholder: "Bericht ... ",
      height: 100,
      onChange: (): void=> {
        // console.log(this.berichtContentContent);
      }
    }

    bericht: DevExpress.ui.dxButtonOptions = {
      text: "Neuen Bericht erstellen",
      type: "default",
      onClick: (): void => {
        this.neuerBericht = true;
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

    dataSourceBesuch: TIP.ISchedulerData = null;
    initBesuch() {
      this.currentDate = this.getParameter("currentDate");
      if (this.currentDate == false) {
        this.currentDate = new Date();
      }
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
        var idForUpdate: number;
        var isOnServer: string;
        //console.log(options.appointment)
        if (options.appointment.Id == null) {
          idForUpdate = options.appointment.ClientId;
          isOnServer = "client_id";
        } else {
          idForUpdate = options.appointment.Id;
          isOnServer = "id";
        }
        var updateBesuchAppointmentData: IUpdateBesuchAppointmentModel[] = new Array();
        updateBesuchAppointmentData.push({
          IdGeschaeftspartner: options.appointment.IdGeschaeftspartner,
          IdBesuchstyp: options.appointment.IdBesuchstyp,
          startDate: options.appointment.startDate,
          endDate: options.appointment.endDate,
          idForUpdate: idForUpdate,
          berichtHeadingContent: this.berichtHeadingContent,
          berichtContentContent: this.berichtContentContent,
          isOnServer: isOnServer
        });
        this.besuch.updateBesuchAppointment(updateBesuchAppointmentData);
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
