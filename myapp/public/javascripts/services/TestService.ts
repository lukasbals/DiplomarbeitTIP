module TIP {
  export class TestService {
    constructor(private $http: ng.IHttpService) {

    }
    getID(id: number): ng.IHttpPromise<any> {
      var eMsg: string = "Error";
      if((id == 1) || (id == 2)) {
        alert("Die eingetippte Nummer ist: " + id);

        this.$http.get("http://localhost:3000/dreier/" + id)
          .success(function(data){
            var data: string = data;
            return data;
          }).
          error(function(data){
            return eMsg;
            })

      } else {
        alert("Den Dreier gibt es nicht.");
        return eMsg;
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
