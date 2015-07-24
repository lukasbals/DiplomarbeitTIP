module TIP {
  export class MyService {
    constructor(private $http: ng.IHttpService) {

    }
    getGeschaeftspartner(): ng.IHttpPromise<any> {
      console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
    }
  }

  angular
    .module("tip")
    .service("MyService", ["$http", MyService]);
}
