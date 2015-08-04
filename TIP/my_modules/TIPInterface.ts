module TIP {
  export interface ITIPData {
    doSync(): void;
    isSyncActive(): boolean;
  }

  export interface ITIPArray {
    TIPDataStammdatenAnrede: void;
    TIPDataStammdatenGeschaeftspartner: void;
    TIPDataStammdatenGpKz: void;
    TIPDataStammdatenLand: void;
    TIPDataStammdatenPerson: void;
    TIPDataStammdatenPersonengruppe: void;
  }
}
