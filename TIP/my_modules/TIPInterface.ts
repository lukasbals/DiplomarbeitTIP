var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");


var syncCount: number = 0;

var doSync = (): void => {
  TIPDataStammdatenGpKz.initTableGpKz();
  TIPDataStammdatenGpKz.loadGpKz();

  TIPDataStammdatenLand.initTableLand();
  TIPDataStammdatenLand.loadLand();

  TIPDataStammdatenAnrede.initTableAnrede();
  TIPDataStammdatenAnrede.loadAnrede();

  TIPDataStammdatenPersonengruppe.initTablePersonengruppe();
  TIPDataStammdatenPersonengruppe.loadPersonengruppe();

  TIPDataStammdatenGeschaeftspartner.initTableGeschaeftspartner();
  TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();

  TIPDataStammdatenPerson.initTablePerson();
  TIPDataStammdatenPerson.loadPerson();
}

var isSyncActive = (): boolean => {
  console.log(syncCount);
  if (syncCount == 0) {
    return false;
  } else {
    return true;
  }
}

module.exports.doSync = doSync;
module.exports.isSyncActive = isSyncActive;
