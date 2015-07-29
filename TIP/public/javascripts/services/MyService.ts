module TIP {
  export class MyService {
    constructor(private $http: ng.IHttpService) {

    }
    getGeschaeftspartner(): ng.IHttpPromise<any> {
      //console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
    }

    getPerson(): ng.IHttpPromise<any> {
      //console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonPerson");
    }

    getGeschaeftspartnerDetail(id): ng.IHttpPromise<any> {
      var table = "geschaeftspartner_st";
      var string: string = '{"id": "' + id + '", "table": "' + table + '"}';
      var json: JSON = JSON.parse(string);
      //console.log(json);
      return this.$http.post("http://localhost:3000/api/getGeschaeftspartnerDetail", json);
    }
  }

  angular
    .module("tip")
    .service("MyService", ["$http", MyService]);
}
