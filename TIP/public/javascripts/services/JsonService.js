/* Service für das Konvertierungen von Json in JavaScript
* sowie div. Hilfsmethoden
*/
var TIP;
(function (TIP) {
    var JsonService = (function () {
        function JsonService() {
            this.regexISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
        }
        JsonService.prototype.parse = function (json) {
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
        return JsonService;
    })();
    TIP.JsonService = JsonService;
    angular
        .module("tip")
        .service("Json", [JsonService]);
})(TIP || (TIP = {}));
