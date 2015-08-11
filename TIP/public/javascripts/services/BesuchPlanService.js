var TIP;
(function (TIP) {
    var BesuchPlanService = (function () {
        function BesuchPlanService($http) {
            this.$http = $http;
            this.regexISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
        }
        BesuchPlanService.prototype.getBesuchPlan = function () {
            return this.$http.get("http://localhost:3000/api/getJsonBesuchPlan");
        };
        BesuchPlanService.prototype.deleteBesuchPlanAppointment = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/deleteBesuchPlanAppointment", json);
        };
        BesuchPlanService.prototype.parse = function (json) {
            var _this = this;
            if (!json) {
                return json;
            }
            if (!(typeof json === "string")) {
                json = JSON.stringify(json);
            }
            return JSON.parse(json, function (key, value) {
                if (typeof value === "string") {
                    var a = _this.regexISO.exec(value);
                    if (a) {
                        return new Date(value);
                    }
                    return value;
                }
                return value;
            });
        };
        return BesuchPlanService;
    })();
    TIP.BesuchPlanService = BesuchPlanService;
    angular
        .module("tip")
        .service("BesuchPlanService", ["$http", BesuchPlanService]);
})(TIP || (TIP = {}));
