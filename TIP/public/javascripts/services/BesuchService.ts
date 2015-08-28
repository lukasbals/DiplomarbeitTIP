module TIP {
  export class BesuchService {
    private regexISO: RegExp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
    constructor(private $http: ng.IHttpService) {

    }

    getBesuch(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonBesuch");
    }

    getBerichtById(besuchId: number, isOnServer: string): ng.IHttpPromise<any> {
      var string: string = '{"besuchId": "' + besuchId + '", "isOnServer": "' + isOnServer + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getBerichtById", json);
    }

    updateBericht(dataSourceBericht): ng.IHttpPromise<any> {
      return this.$http.post("http://localhost:3000/api/updateBericht", dataSourceBericht);
    }

    deleteBericht(ClientId): ng.IHttpPromise<any> {
      var string: string = '{"ClientId": "' + ClientId + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/deleteBericht", json);
    }

    getDetailGeschaeftspartner(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailGeschaeftspartner", json);
    }

    deleteBesuchAppointment(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/deleteBesuchAppointment", json);
    }

    updateBesuchAppointment(updateBesuchAppointmentData): ng.IHttpPromise<any> {
      return this.$http.post("http://localhost:3000/api/updateBesuchAppointment", updateBesuchAppointmentData);
    }

    saveBesuchAppointment(saveBesuchAppointmentData): ng.IHttpPromise<any> {
      return this.$http.post("http://localhost:3000/api/saveBesuchAppointment", saveBesuchAppointmentData);
    }

    getDetailBesuch(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailBesuch", json);
    }

    getAllGeschaeftspartnerForSearch(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
    }

    getAllBesuchstypForSearch(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonBesuchstyp");
    }

    parse(json: any): any {
      if (!json) {
        return json;
      }

      // console.log(json);

      if (!(typeof json === "string")) {
        json = JSON.stringify(json);
      }

      return JSON.parse(json, (key: string, value: string): any => {
        if (typeof value === "string") {
          var a: any = this.regexISO.exec(value);

          if (a) {
            return new Date(value);
          }

          return value;
        }
        return value;
      });
    }
  }

  angular
    .module("tip")
    .service("BesuchService", ["$http", BesuchService]);
}
