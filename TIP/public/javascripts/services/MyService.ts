module TIP {
  export class MyService {
    constructor(private $http: ng.IHttpService) {

    }
    getGeschaeftspartner(): ng.IHttpPromise<any> {
      //console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
    }

    getPerson(): ng.IHttpPromise<any> {
      //console.log("IN");
      return this.$http.get("http://localhost:3000/api/getJsonPerson");
    }

    //
    // synch data from TIP server
    //
    synchDB(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/synchDB");
    }

    //
    // sets table var and calls getDetail function
    //
    getGeschaeftspartnerDetail(id): ng.IHttpPromise<any> {
      var table = "geschaeftspartner_st";
      return this.getDetail(id, table);
    }

    getPersonDetail(id): ng.IHttpPromise<any> {
      var table = "personen_st";
      return this.getDetail(id, table);
    }

    //
    // sends getDetail request to the server
    //
    getDetail(id, table): ng.IHttpPromise<any> {
      var string: string = '{"id": "' + id + '", "table": "' + table + '"}';
      var json: JSON = JSON.parse(string);
      return this.$http.post("http://localhost:3000/api/getDetail", json);
    }
  }

  angular
    .module("tip")
    .service("MyService", ["$http", MyService]);
}
