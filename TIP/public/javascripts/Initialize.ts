declare var Globalize: any;

module TIP {
  var clientLanguageToUse = navigator.language || navigator.browserLanguage;
  Globalize.culture(clientLanguageToUse);
  DevExpress.devices.current({ platform: "generic" });

  angular
    .module("tip", ["ngSanitize", "dx"]);
}
