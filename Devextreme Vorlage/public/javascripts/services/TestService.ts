module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }

    getProduct(id: number): ng.IHttpPromise<any> {
      return this.$http.get("asfasdf");
    }
  }

  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
