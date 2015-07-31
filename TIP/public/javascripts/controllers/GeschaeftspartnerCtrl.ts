module TIP {
  export class GeschaeftspartnerViewModel {
    constructor(private geschaeftspartner: GeschaeftspartnerService) {

    }

    //
    // Detail Page
    //

    // detail-page geschaeftspartner
    detailGeschaeftspartnerDataSource: JSON = null;
    detailPersonDataSourceInGP: JSON = null;
    initDetailGeschaeftspartner() {
      var id: number = this.getParameter("id");
      this.geschaeftspartner.getDetailGeschaeftspartner(id)
        .success((data): void => {
        //console.log(data[0]);
        this.detailGeschaeftspartnerDataSource = data[0];


      })
        .error((data): void => {
        console.log("Keine DetailDaten bekommen.");
      });
      this.geschaeftspartner.getDetailPersonForGP(id)
        .success((data): void=> {
        this.detailPersonDataSourceInGP = data;
      }).error((data): void => {
        console.log("Keine DetailDaten bekommen.");
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
      this.geschaeftspartner.getGeschaeftspartner()
        .success((data): void => {
        this.dataSourceGeschaeftspartner = data;
      })
        .error((data): void => {
        console.log("Keine Geschaeeftspartner bekommen.");
      });
    }

    gridGeschaeftspartner: any = {
      loadPanel: false,
      columns: [{
        dataField: 'GpNummer',
        caption: "GP Nummer",
        width: 70,
        allowFiltering: true
      }, {
          dataField: 'Firmenbez1',
          allowFiltering: true
        }, {
          dataField: 'Firmenbez2',
          width: 200,
          allowFiltering: true
        }, {
          dataField: 'Strasse',
          width: 200,
          allowFiltering: true
        }, {
          dataField: 'Plz',
          width: 60,
          allowFiltering: true
        }, {
          dataField: "Ort",
          width: 150,
          allowFiltering: true
        }, {
          dataField: "CodeLand",
          width: 50,
          caption: "Land",
          allowFiltering: true
        }],
      columnAutoWidth: true,
      bindingOptions: {
        dataSource: "vm.dataSourceGeschaeftspartner"
      },
      scrolling: {
        mode: 'infinite'
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

    gridPersonInGP: any = {
      //loadPanel: false,
      columns: [{
          dataField: "Anrede"
        }, {
          dataField: "Vorname"
        }, {
          dataField: "Nachname"
        }, {
          dataField: "Abteilung"
        }],
      columnAutoWidth: true,
      bindingOptions: {
        dataSource: "vm.detailPersonDataSourceInGP"
      },
      rowClick: (options): void => {
        window.location.href = "http://localhost:3000/detail/detailPerson?id=" + options.data.Id;
      }
    }
  }

  export interface GeschaeftspartnerScope extends ng.IScope {
    vm: GeschaeftspartnerViewModel;
  }

  export class GeschaeftspartnerCtrl {
    constructor(private geschaeftspartner: GeschaeftspartnerService, public $scope: GeschaeftspartnerScope) {
      $scope.vm = new GeschaeftspartnerViewModel(geschaeftspartner);
    }
  }

  angular
    .module("tip")
    .controller("GeschaeftspartnerCtrl", ["GeschaeftspartnerService", "$scope", GeschaeftspartnerCtrl]);
}
