module TIP {
  export class LoadService {
    constructor(private $http: ng.IHttpService) {

    }
    //
    // synch data from TIP server
    //
    synchDB(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/synchDB");
    }
  }

  angular
    .module("tip")
    .service("LoadService", ["$http", LoadService]);
}
