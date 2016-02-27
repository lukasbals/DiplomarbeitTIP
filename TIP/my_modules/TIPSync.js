var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIPDataVertreterBericht = require("../my_modules/TIPDataVertreterBericht");
var TIPDataVertreterBesuch = require("../my_modules/TIPDataVertreterBesuch");
var TIPDataVertreterBesuchPlan = require("../my_modules/TIPDataVertreterBesuchPlan");
var TIPDataVertreterBesuchstyp = require("../my_modules/TIPDataVertreterBesuchstyp");
var TIPDataVertreterTourPlan = require("../my_modules/TIPDataVertreterTourPlan");
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
                TIPDataVertreterBericht,
                TIPDataVertreterBesuch,
                TIPDataVertreterBesuchPlan,
                TIPDataVertreterBesuchstyp,
                TIPDataVertreterTourPlan
            ];
        }
        TIPSync.prototype.doSync = function (res) {
            this.tipDataArray.forEach(function (e) {
                e.doSync();
            });
            res.render('index');
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
    }());
    TIP.TIPSync = TIPSync;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPSync();
