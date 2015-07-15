module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }
    getID(id: number): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/dreier/" + id);
    }
  }
  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
