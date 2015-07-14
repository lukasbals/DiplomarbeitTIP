module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService){
    }

    getProduct(id: number): ng.IHttpPromise<any> {
      return this.$http.get("www.url.com");
    }
  }

  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
