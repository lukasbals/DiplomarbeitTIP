var TIP;
(function (TIP) {
    var MyService = (function () {
        function MyService($http) {
            this.$http = $http;
        }
        MyService.prototype.getGeschaeftspartner = function () {
            console.log("IN");
            return this.$http.get("http://localhost:3000/api/getJsonGeschaeftspartner");
        };
        MyService.prototype.getPerson = function () {
            console.log("IN");
            return this.$http.get("http://localhost:3000/api/getJsonPerson");
        };
        MyService.prototype.postDetail = function (data) {
            return this.$http.post("http://localhost:3000/details/postDetails", data);
        };
        return MyService;
    })();
    TIP.MyService = MyService;
    angular
        .module("tip")
        .service("MyService", ["$http", MyService]);
})(TIP || (TIP = {}));
