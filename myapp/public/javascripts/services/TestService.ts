module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }
    getID(id: string): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/users/" + id);

    }

    getData(): ng.IHttpPromise<any> {
      //alert("In");
      console.log("Hallo Chrome Console!");
      return this.$http.get("http://localhost:3000/users/data");
    }
  }
  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
