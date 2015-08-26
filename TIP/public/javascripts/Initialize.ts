declare var Globalize: any;

module TIP {
  Globalize.addCultureInfo("de-AT", {
    messages: {
      "dxScheduler-openAppointment": "Termin öffnen"
    }
  });
  Globalize.culture("de-AT");
  DevExpress.devices.current({ platform: "generic" });

  angular
    .module("tip", ["ngSanitize", "dx", "angular-loading-bar"])
    .config(['cfpLoadingBarProvider', (cfpLoadingBarProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 1;
  }]);
}
