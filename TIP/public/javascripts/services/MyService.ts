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

    postDetail(id: number): ng.IHttpPromise<any> {
      //console.log(data);
      return this.$http.get("http://localhost:3000/details?id=" + id);
    }
  }

  angular
    .module("tip")
    .service("MyService", ["$http", MyService]);
}
