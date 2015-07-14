module DREIER{
  export interface TestScope extends ng.IScope{
    vorname: string;
    nachname: string;
    getProduct(id: number):void;
  }
  export class TestCtrl{
    constructor(private test: TestService, public $scope: TestScope){
      
    }
  }
}
