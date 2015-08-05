module TIP {
  export interface ITIPData {
    doSync(): void;
    isSyncActive(): boolean;
  }
  export interface IAnredeModel {
    Code: string;
    Bezeichnung: string;
  }
  export interface IGpKzModel {
    Code: string;
    Bezeichnung: string;
  }
  export interface IGpStammModel {
    Id: number;
    GpNummer: number;
    CodeGpKz: string;
    Firmenbez1: string;
    Firmenbez2: string;
    Firmenbez3: string;
    Strasse: string;
    CodeLand: string;
    Plz: string;
    Ort: string;
    Telefon: string;
    Fax: string;
    Email: string;
    Homepage: string;
  }
  export interface IGpDetailModel {
    Id: number;
    GpNummer: number;
    CodeGpKz: string;
    Firmenbez1: string;
    Firmenbez2: string;
    Firmenbez3: string;
    Strasse: string;
    CodeLand: string;
    Plz: string;
    Ort: string;
    Telefon: string;
    Fax: string;
    Email: string;
    Homepage: string;
    Land: string;
    GpKz: string;
    IsEU: string;
  }
  export interface ILandModel {
    Code: string;
    Bezeichnung: string;
    IsEU: boolean;
  }
  export interface IPersonengruppeModel {
    Code: string;
    Bezeichnung: string;
  }
  export interface IPersonModel {
    Id: number;
    IdGeschaeftspartner: number;
    CodePersonengruppe: string;
    CodeAnrede: string;
    Titel: string;
    Vorname: string;
    Nachname: string;
    Abteilung: string;
    Telefon: string;
    Mobil: string;
    Fax: string;
    Email: string;
    Geburtsdatum: Date;
  }
  export interface IPersonDetailModel {
    Id: number;
    IdGeschaeftspartner: number;
    CodePersonengruppe: string;
    CodeAnrede: string;
    Titel: string;
    Vorname: string;
    Nachname: string;
    Abteilung: string;
    Telefon: string;
    Mobil: string;
    Fax: string;
    Email: string;
    Geburtsdatum: Date;
    Gruppe: string;
    Anrede: string;
    Firmenbez1: string;
  }
}
