module TIP {
  export class MyService {
    constructor(private $http: ng.IHttpService) {

    }


  }

  angular
    .module("tip")
    .service("MyService", ["$http", MyService]);
}
