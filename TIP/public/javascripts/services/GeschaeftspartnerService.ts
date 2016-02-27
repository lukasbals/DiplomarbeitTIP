module TIP {
  export class GeschaeftspartnerService {
    constructor(private $http: ng.IHttpService) {

    }
    
    getGeschaeftspartner(): ng.IHttpPromise<any> {
      //console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
    }

    //
    // gets details for the pages
    //
    getDetailGeschaeftspartner(id: number): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailGeschaeftspartner", json);
    }

    getDetailPersonForGP(id: number): ng.IHttpPromise<any>{
      var string: string = '{"id": "' + id + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetailPersonForGP", json);
    }
  }

  angular
    .module("tip")
    .service("GeschaeftspartnerService", ["$http", GeschaeftspartnerService]);
}
