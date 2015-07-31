var TIP;
(function (TIP) {
    var clientLanguageToUse = navigator.language || navigator.browserLanguage;
    DevExpress.devices.current({ platform: "generic" });
    angular
        .module("tip", ["ngSanitize", "dx", "angular-loading-bar"])
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }]);
})(TIP || (TIP = {}));
