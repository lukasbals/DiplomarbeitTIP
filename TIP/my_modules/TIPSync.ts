var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");

module TIP {
  export class TIPSync implements ITIPData{
    tipDataArray = [
      TIPDataStammdatenAnrede,
      TIPDataStammdatenGeschaeftspartner,
      TIPDataStammdatenGpKz,
      TIPDataStammdatenLand,
      TIPDataStammdatenPerson,
      TIPDataStammdatenPersonengruppe
    ];

    doSync(): void {
      this.tipDataArray.forEach((e): void => {
        //e.doSync();
      });
    }

    isSyncActive(): boolean {
      var count: number = 0;
      this.tipDataArray.forEach((e): void => {

      });
      return null;
    }
  }
}
module.exports = new TIP.TIPSync();
