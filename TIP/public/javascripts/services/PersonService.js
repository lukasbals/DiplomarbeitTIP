var TIP;
(function (TIP) {
    var PersonService = (function () {
        function PersonService($http) {
            this.$http = $http;
        }
        PersonService.prototype.getPerson = function () {
            return this.$http.get("http://localhost:3000/api/getJsonPerson");
        };
        PersonService.prototype.getDetailPerson = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetailPerson", json);
        };
        PersonService.prototype.getDetailGeschaeftspartnerForPerson = function (id) {
            var string = '{"id": "' + id + '"}';
            var json = JSON.parse(string);
            return this.$http.post("http://localhost:3000/api/getDetailGeschaeftspartnerForPerson", json);
        };
        return PersonService;
    })();
    TIP.PersonService = PersonService;
    angular
        .module("tip")
        .service("PersonService", ["$http", PersonService]);
})(TIP || (TIP = {}));
