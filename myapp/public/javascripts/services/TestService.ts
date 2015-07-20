module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }
    getID(id: string): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/users/" + id);

    }

    getData(): ng.IHttpPromise<any> {
      //alert("In");
      //console.log("Hallo Chrome Console!");
      return this.$http.get("http://localhost:3000/users/data");
    }

    init(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/teams");
    }

    insertTeam(team: string, country: string): ng.IHttpPromise<any> {
      //alert("IN");
      var data = '{"team":"' + team + '","country":"' + country + '"}';
      var json = JSON.parse(data);
      //alert(data);
      return this.$http.post("http://localhost:3000/teams", json);
    }

    deleteTeam(id: number): ng.IHttpPromise<any> {
      var idJson = '{"idDelete":' + id + '}';
      var json = JSON.parse(idJson);
      console.log(json);
      return this.$http.post("http://localhost:3000/deleteTeam", json);
    }
  }
  angular
    .module("tip")
    .service("Test", ["$http", TestService]);
}
