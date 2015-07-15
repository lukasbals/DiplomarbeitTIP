module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }
    getID(id: number): ng.IHttpPromise<any> {
      if ((id == 1) || (id == 2)) {
        /*alert("Die eingetippte Nummer ist: " + id);*/
        return this.$http.get("http://localhost:3000/dreier/" + id);
      } else {
        alert("Den Dreier gibt es nicht.");
      }
    }

    /*constructor(private $location: ng.ILocationService) {

    }

    getID(id: number) {
      alert(id);
      return  this.$location.path("/" + id);
    }*/
  }
  angular
    .module("tip")
    .service("Test", ["$http", TestService]);

  /*.service("Test", ["$location", TestService]);*/
}
