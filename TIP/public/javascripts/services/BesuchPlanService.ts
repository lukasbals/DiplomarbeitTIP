module TIP {
  export class BesuchPlanService {
    private regexISO: RegExp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
    constructor(private $http: ng.IHttpService) {

    }

    getBesuchPlan(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonBesuchPlan");
    }

    deleteBesuchPlanAppointment(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/deleteBesuchPlanAppointment", json);
    }

    updateBesuchPlanAppointment(id_geschaeftspartner: number, startDate: Date, endDate: Date, id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '", "startDate": "' + startDate + '", "endDate": "' + endDate + '", "id_geschaeftspartner": "' + id_geschaeftspartner + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/updateBesuchPlanAppointment", json);
    }

    getDetailBesuchPlan(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailBesuchPlan", json);
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
    .service("BesuchPlanService", ["$http", BesuchPlanService]);
}
