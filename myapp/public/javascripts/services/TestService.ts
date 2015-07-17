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

    insertTeam(team: string, country: string): ng.IHttpPromise<any> {
      //alert("IN");
      var data = '{"team":"' + team + '","country":"' + country + '"}';
      var json = JSON.parse(data);
      //alert(data);
      return this.$http.post("http://localhost:3000/teams", json);
    }
  }
  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
