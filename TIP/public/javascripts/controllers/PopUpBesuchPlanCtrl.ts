module TIP {
  export class PopUpBesuchPlanViewModel {
    constructor(private PopUpBesuchPlan: PopUpBesuchPlanService) {

    }

    visiblePopup: boolean = false;
    info;
    text: string = "Tobis schönster Tag!";

    Button = {
      text: "Click me!",
      onClick: ():  void => {
        console.log("IN");
        this.visiblePopup = true;
        console.log(this.visiblePopup);
      }
    }

    popUpOptions = {
      width: 300,
      height: 250,
      contentTemplate: this.info,
      showTitle: true,
      title: "Information",
      bindingOptions: {
        visible: "vm.visiblePopup"
      },
      dragEnabled: false,
      closeOnOutsideClick: true
    }

  }

  export interface PopUpBesuchPlanScope extends ng.IScope {
    vm: PopUpBesuchPlanViewModel;
  }

  export class PopUpBesuchPlanCtrl {
    constructor(private PopUpBesuchPlan: PopUpBesuchPlanService, public $scope: PopUpBesuchPlanScope) {
      $scope.vm = new PopUpBesuchPlanViewModel(PopUpBesuchPlan);
    }
  }

  angular
    .module("tip")
    .controller("PopUpBesuchPlanCtrl", ["PopUpBesuchPlanService", "$scope", PopUpBesuchPlanCtrl]);
}
