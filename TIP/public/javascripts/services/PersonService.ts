module TIP {
  export class PersonService {
    constructor(private $http: ng.IHttpService) {

    }
    getPerson(): ng.IHttpPromise<any> {
      //console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonPerson");
    }

    //
    // gets details for the pages
    //
    getDetailPerson(id: number): ng.IHttpPromise<any>{
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailPerson", json);
    }

    getDetailGeschaeftspartnerForPerson(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailGeschaeftspartnerForPerson", json);
    }
  }

  angular
    .module("tip")
    .service("PersonService", ["$http", PersonService]);
}
