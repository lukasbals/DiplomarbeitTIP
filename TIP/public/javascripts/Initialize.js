var TIP;
(function (TIP) {
    Globalize.culture("de-AT");
    DevExpress.devices.current({ platform: "generic" });
    angular
        .module("tip", ["ngSanitize", "dx", "angular-loading-bar"])
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.latencyThreshold = 1;
        }]);
})(TIP || (TIP = {}));
