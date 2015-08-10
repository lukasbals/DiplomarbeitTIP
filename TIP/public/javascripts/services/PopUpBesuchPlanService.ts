module TIP {
  export class PopUpBesuchPlanService {
    constructor(private $http: ng.IHttpService) {

    }

  }


  angular
    .module("tip")
    .service("PopUpBesuchPlanService", ["$http", PopUpBesuchPlanService]);
}
