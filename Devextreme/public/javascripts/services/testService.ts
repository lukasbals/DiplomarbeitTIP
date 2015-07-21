module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }

    getData(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/data");
    }
  }

  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
