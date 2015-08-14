var TIP;
(function (TIP) {
    var BesuchService = (function () {
        function BesuchService($http) {
            this.$http = $http;
            this.regexISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
        }
        BesuchService.prototype.getBesuch = function () {
            return this.$http.get("http://localhost:3000/api/getJsonBesuch");
        };
        BesuchService.prototype.deleteBesuchAppointment = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/deleteBesuchAppointment", json);
        };
        BesuchService.prototype.updateBesuchAppointment = function (id_geschaeftspartner, startDate, endDate, id) {
            var string = '{"id": "' + id + '", "startDate": "' + startDate + '", "endDate": "' + endDate + '", "id_geschaeftspartner": "' + id_geschaeftspartner + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/updateBesuchAppointment", json);
        };
        BesuchService.prototype.saveBesuchAppointment = function (id_geschaeftspartner, startDate, endDate) {
            var string = '{"startDate": "' + startDate + '", "endDate": "' + endDate + '", "id_geschaeftspartner": "' + id_geschaeftspartner + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/saveBesuchAppointment", json);
        };
        BesuchService.prototype.getDetailBesuch = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetailBesuch", json);
        };
        BesuchService.prototype.getAllGeschaeftspartnerForSearch = function () {
            return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
        };
        BesuchService.prototype.parse = function (json) {
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
        return BesuchService;
    })();
    TIP.BesuchService = BesuchService;
    angular
        .module("tip")
        .service("BesuchService", ["$http", BesuchService]);
})(TIP || (TIP = {}));
