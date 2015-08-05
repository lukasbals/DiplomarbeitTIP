var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIPDataVertreterBericht = require("../my_modules/TIPDataVertreterBericht");
var TIP;
(function (TIP) {
    var TIPSync = (function () {
        function TIPSync() {
            this.tipDataArray = [
                TIPDataStammdatenAnrede,
                TIPDataStammdatenGeschaeftspartner,
                TIPDataStammdatenGpKz,
                TIPDataStammdatenLand,
                TIPDataStammdatenPerson,
                TIPDataStammdatenPersonengruppe,
                TIPDataVertreterBericht
            ];
        }
        TIPSync.prototype.doSync = function () {
            this.tipDataArray.forEach(function (e) {
                e.doSync();
            });
        };
        TIPSync.prototype.isSyncActive = function () {
            var count = 0;
            this.tipDataArray.forEach(function (e) {
                if (e.isSyncActive() == true) {
                    count++;
                }
            });
            if (count == 0) {
                return false;
            }
            else {
                return true;
            }
        };
        return TIPSync;
    })();
    TIP.TIPSync = TIPSync;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPSync();
