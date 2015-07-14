module TIP {
  export interface TestScope extends ng.IScope {
    vorname: string;
    nachname: string;
  }

  angular
    .module("tip")
    .controller("TestCtrl", ["Test", "$scope", TestCtrl]);
}
