module TIP {
  export class TestViewModel {
    constructor(private test: TestService) {
    }
    vorname: string;
    nachname: string;
    tipData: JSON;

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
        /*this.test.getData()
          .success(function(data) {
          console.log("success");
          this.tipData = data;
          console.log(data);
        })
          .error(function() {
          console.log("error");
        });*/
        //return tipData;
        DevExpress.ui.notify("Hallo " + this.vorname + " " + this.nachname, "info", 2000);
      }
    }

    gridConfig: DevExpress.ui.dxDataGridOptions = {
      dataSource: new DevExpress.data.DataSource({
        /*this.test.getData()
          .success(function(data) {
          console.log("success");

          console.log(data);
        })
          .error(function() {
          console.log("error");
        });*/
        }),
      columns: [
        'Id',
        'GpNummer',
        'CodeGpKz',
        'Firmenbez1',
        'Firmenbez2',
        'Firmenbez3',
        'Strasse',
        'Codeland',
        'Plz',
        'Ort',
        'Telefon',
        'Fax',
        'Email',
        'Homepage'
      ]
    }

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
