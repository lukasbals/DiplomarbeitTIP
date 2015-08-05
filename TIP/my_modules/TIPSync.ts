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

module TIP {
  export class TIPSync {
    tipDataArray = [
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

    doSync(): void {
      this.tipDataArray.forEach((e): void => {
        e.doSync();
      });
    }

    isSyncActive(): boolean {
      var count: number = 0;
      this.tipDataArray.forEach((e): void => {
        if (e.isSyncActive() == true) {
          count++;
        }
        //console.log("in der schleife" + e.isSyncActive());
      });
      if (count == 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
module.exports = new TIP.TIPSync();
