module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService){
    }
  }

  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
