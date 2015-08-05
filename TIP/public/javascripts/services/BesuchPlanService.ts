module TIP {
  export class BesuchPlanService {
    constructor(private $http: ng.IHttpService) {

    }

    getBesuchPlan(): ng.IHttpPromise<any> {
      return this.$http.get("http://localhost:3000/api/getJsonBesuchPlan");
    }
  }

  angular
    .module("tip")
    .service("BesuchPlanService", ["$http", BesuchPlanService]);
}
