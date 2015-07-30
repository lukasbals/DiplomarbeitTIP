module TIP {
  export class GeschaeftspartnerViewModel {
    constructor(private my: MyService) {

    }
    //
    // Detail Page
    //

    // detail-page geschaeftspartner
    detailGeschaeftspartnerDataSource: JSON = null;
    initDetailGeschaeftspartner() {
      var id: number = this.getParameter("id");
      this.my.getGeschaeftspartnerDetail(id)
        .success((data): void => {
        this.detailGeschaeftspartnerDataSource = data[0];
      })
        .error((data): void => {
        console.log("Keine DetailDaten bekommen.")
      });
    }

    getParameter = (theParameter): any => {
      var params = window.location.search.substr(1).split('&');
      for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        if (p[0] == theParameter) {
          return decodeURIComponent(p[1]);
        }
      }
      return false;
    }

    //
    // Geschäftspartner Page
    //
    dataSourceGeschaeftspartner: JSON = null;
    initGeschaeftspartner() {
      this.my.getGeschaeftspartner()
        .success((data): void => {
        this.dataSourceGeschaeftspartner = data;
      })
        .error((data): void => {
        console.log("Keine Geschaeeftspartner bekommen.");
      });
    }

    gridGeschaeftspartner: any = {
      //loadPanel: false,
      columns: [{
        dataField: 'GpNummer',
        caption: "Nummer",
        width: 70,
        allowFiltering: false
      }, {
          dataField: 'Firmenbez1'
        }, {
          dataField: 'Firmenbez2',
          width: 200
        }, {
          dataField: 'Strasse',
          width: 200,
          allowFiltering: false
        }, {
          dataField: 'Plz',
          width: 60,
          allowFiltering: false
        }, {
          dataField: "Ort",
          width: 150,
          allowFiltering: false
        }, {
          dataField: "CodeLand",
          width: 50,
          caption: "Land",
          allowFiltering: false
        }],
      columnAutoWidth: true,
      bindingOptions: {
        dataSource: "vm.dataSourceGeschaeftspartner"
      },
      paging: {
        pageSize: 25
      },
      searchPanel: {
        visible: true,
        width: 250,
        highlightSearchText: false,
        placeholder: "Suchen..."
      },
      rowClick: (options): void => {
        window.location.href = "http://localhost:3000/detail/detailGeschaeftspartner?id=" + options.data.Id;
      }
    }
  }

  export interface GeschaeftspartnerScope extends ng.IScope {
    vm: GeschaeftspartnerViewModel;
  }

  export class GeschaeftspartnerCtrl {
    constructor(private my: MyService, public $scope: GeschaeftspartnerScope) {
      $scope.vm = new GeschaeftspartnerViewModel(my);
    }
  }

  angular
    .module("tip")
    .controller("GeschaeftspartnerCtrl", ["MyService", "$scope", GeschaeftspartnerCtrl]);
}
