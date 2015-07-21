module TIP {
  export class IService {
    constructor(private $http: ng.IHttpService) {

    }


  }

  angular
    .module("tip")
    .service("IService", ["$http", IService]);
}
