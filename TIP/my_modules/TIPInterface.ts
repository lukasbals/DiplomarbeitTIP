module TIP {
  export interface ITIPData {
    doSync(): void;
    isSyncActive(): boolean;
    initTable(): void;
    loadTable(): void;
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

  export interface IBerichtModel {
    ClientId: number;
    ClientIdBesuch: number;
    Id: number;
    IdBesuch: number;
    Text: string;
    Titel: string;
    IsDeleted: number;
    IsChanged: number;
  }

  export interface IBesuchModel {
    ClientId: number;
    Id: number;
    IdBesuchstyp: number;
    ClientIdBesuchPlan: number;
    IdBesuchPlan: number;
    IdGeschaeftspartner: number;
    Von: Date;
    Bis: Date;
    IsDeleted: number;
    IsChanged: number;
  }

  export interface IBesuchPlanModel {
    ClientId: number;
    Id: number;
    IdTourPlan: number;
    ClientIdTourPlan: number;
    IdGeschaeftspartner: number;
    Von: Date;
    Bis: Date;
    Status: number;
    IsDeleted: number;
    IsChanged: number;
  }

  export interface IBesuchPlanDetailModel {
    ClientId: number;
    Id: number;
    IdTourPlan: number;
    ClientIdTourPlan: number;
    IdGeschaeftspartner: number;
    startDate: Date;
    endDate: Date;
    Status: number;
    IsDeleted: number;
    IsChanged: number;
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

  export interface IBesuchstypModel {
    Id: number;
    Bezeichnung: string;
  }

  export interface ITourPlanModel {
    ClientId: number;
    Id: number;
    TourName: string;
    Von: Date;
    Bis: Date;
  }

  export interface ISchedulerData {
    text: string;
    startDate: Date;
    endDate: Date;
    ClientId: number;
    IdGeschaeftspartner: number;
  }
}
