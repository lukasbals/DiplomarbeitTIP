var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIP;
(function (TIP) {
    var TIPSync = (function () {
        function TIPSync() {
            this.tipDataArray = [
                TIP.TIPDataStammdatenAnrede,
                TIP.TIPDataStammdatenGeschaeftspartner,
                TIP.TIPDataStammdatenGpKz,
                TIP.TIPDataStammdatenLand,
                TIP.TIPDataStammdatenPerson,
                TIP.TIPDataStammdatenPersonengruppe
            ];
        }
        TIPSync.prototype.doSync = function () {
            this.tipDataArray.forEach(function (e) {
            });
        };
        TIPSync.prototype.isSyncActive = function () {
            var count = 0;
            this.tipDataArray.forEach(function (e) {
            });
            return null;
        };
        return TIPSync;
    })();
    TIP.TIPSync = TIPSync;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPSync();
