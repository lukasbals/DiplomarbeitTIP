module TIP {
  export class BesuchService {
    private regexISO: RegExp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
    constructor(private $http: ng.IHttpService) {

    }

    getBesuch(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonBesuch");
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

    updateBesuchAppointment(id_geschaeftspartner: number, id_besuchstyp: number, startDate: Date, endDate: Date, id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '", "startDate": "' + startDate + '", "endDate": "' + endDate + '", "id_geschaeftspartner": "' + id_geschaeftspartner + '", "id_besuchstyp": "' + id_besuchstyp + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/updateBesuchAppointment", json);
    }

    saveBesuchAppointment(id_geschaeftspartner: number, id_besuchstyp: number, startDate: Date, endDate: Date): ng.IHttpPromise<any> {
      var string: string = '{"startDate": "' + startDate + '", "endDate": "' + endDate + '", "id_geschaeftspartner": "' + id_geschaeftspartner + '", "id_besuchstyp": "' + id_besuchstyp + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/saveBesuchAppointment", json);
    }

    getDetailBesuch(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailBesuch", json);
    }

    getAllGeschaeftspartnerForSearch():ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
    }

    getAllBesuchstypForSearch():ng.IHttpPromise<any> {
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
