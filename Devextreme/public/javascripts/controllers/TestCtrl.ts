module TIP {
  export class TestViewModel {
    constructor(private test: TestService) {
    }
    vorname: string;
    nachname: string;
    peoples: JSON;

    vornameConfig: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Vorname",
      bindingOptions: {
        value: "vm.vorname"
      }
    }
    nachnameConfig: DevExpress.ui.dxTextBoxOptions = {
      placeholder: "Nachname",
      bindingOptions: {
        value: "vm.nachname"
      }
    }
    doSomethingConfig: DevExpress.ui.dxButtonOptions = {
      text: "Do Something",
      onClick: (): void => {
        this.test.insertPeople()
          .success(function(data) {
          alert("success");
          //this.peoples = data;
          console.log(data);
        })
          .error(function() {
          alert("error");
        });
        DevExpress.ui.notify("Hallo " + this.vorname + " " + this.nachname, "info", 2000);
      }
    }

    /*listConfig: DevExpress.ui.dxListOptions = {
      dataSource: this.peoples,
      grouped: true,
      showDeleteControls: true,
      showReorderControls: true,
      showSelectionControls: true
    }*/
  }
  export interface TestScope extends ng.IScope {
    vm: TestViewModel;
  }

  export class TestCtrl {
    constructor(private test: TestService, public $scope: TestScope) {
      $scope.vm = new TestViewModel(test);
    }
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
