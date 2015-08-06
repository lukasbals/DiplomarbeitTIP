/* Service für Zugriff auf RESTful Services mit speziellem Fehlerhandling
* get/post/delete
*/
var TIP;
(function (TIP) {
    var RestService = (function () {
        function RestService(json, notification, $http, $q) {
            this.json = json;
            this.notification = notification;
            this.$http = $http;
            this.$q = $q;
        }
        RestService.prototype.beginRequest = function (loadingContainerOptions) {
            if (!loadingContainerOptions) {
                return null;
            }
            loadingContainerOptions.current.begin();
        };
        RestService.prototype.endRequest = function (loadingContainerOptions) {
            if (!loadingContainerOptions) {
                return null;
            }
            loadingContainerOptions.current.end();
        };
        RestService.prototype.get = function (options) {
            var _this = this;
            this.beginRequest(options.loadingContainerOptions);
            var q = this.$q.defer();
            var url = Helpers.getFQUrl(options.url);
            this.$http.get(url)
                .success(function (data) {
                data = _this.json.parse(data);
                q.resolve(data);
            })
                .error(function (callback) {
                q.reject(callback);
            })
                .finally(function () {
                _this.endRequest(options.loadingContainerOptions);
            });
            return q.promise;
        };
        RestService.prototype.post = function (options) {
            var _this = this;
            this.beginRequest(options.loadingContainerOptions);
            var q = this.$q.defer();
            var url = Helpers.getFQUrl(options.url);
            this.$http.post(url, options.data)
                .success(function (data) {
                data = _this.json.parse(data);
                q.resolve(data);
            })
                .error(function (callback) {
                q.reject(callback);
            })
                .finally(function () {
                _this.endRequest(options.loadingContainerOptions);
            });
            return q.promise;
        };
        RestService.prototype.delete = function (options) {
            var _this = this;
            this.beginRequest(options.loadingContainerOptions);
            var q = this.$q.defer();
            var url = Helpers.getFQUrl(options.url);
            this.$http.delete(url)
                .success(function (data) {
                data = _this.json.parse(data);
                q.resolve(data);
            })
                .error(function (callback) {
                q.reject(callback);
            })
                .finally(function () {
                _this.endRequest(options.loadingContainerOptions);
            });
            return q.promise;
        };
        return RestService;
    })();
    TIP.RestService = RestService;
    angular
        .module("tip")
        .service("Rest", ["Json", "Notification", "$http", "$q", RestService]);
})(TIP || (TIP = {}));
