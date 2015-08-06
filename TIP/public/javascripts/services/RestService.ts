/* Service für Zugriff auf RESTful Services mit speziellem Fehlerhandling
 * get/post/delete
 */

//TODO-SH: Fehlerbehandlung und Anzeige + Weiterleiten an Login, wenn Security-Fehler

module TIP {
  export interface IRestOptions {
    url: string;
    loadingContainerOptions?: ITIPLoadingContainerOptions;
  }
  export interface IRestGetOptions extends IRestOptions {
  }
  export interface IRestPostOptions extends IRestOptions {
    data: any;
  }
  export interface IRestDeleteOptions extends IRestOptions {
  }

  export class RestService {
    constructor(private json: JsonService, private notification: NotificationService, private $http: ng.IHttpService, private $q: ng.IQService) {

    }

    private beginRequest(loadingContainerOptions: ITIPLoadingContainerOptions): void {
      if (!loadingContainerOptions) {
        return null;
      }

      loadingContainerOptions.current.begin();
    }
    private endRequest(loadingContainerOptions: ITIPLoadingContainerOptions): void {
      if (!loadingContainerOptions) {
        return null;
      }

      loadingContainerOptions.current.end();
    }

    get(options: IRestGetOptions): ng.IPromise<any> {
      this.beginRequest(options.loadingContainerOptions);
      var q = this.$q.defer();

      var url = Helpers.getFQUrl(options.url);

      this.$http.get(url)
        .success((data: any): void => {
        data = this.json.parse(data);
        q.resolve(data);
      })
        .error(callback => {
        q.reject(callback);
      })
        .finally((): void => {
          this.endRequest(options.loadingContainerOptions);
        });

      return q.promise;
    }
    post(options: IRestPostOptions): ng.IPromise<any> {
      this.beginRequest(options.loadingContainerOptions);
      var q = this.$q.defer();

      var url = Helpers.getFQUrl(options.url);

      this.$http.post(url, options.data)
        .success((data: any): void => {
          data = this.json.parse(data);
          q.resolve(data);
        })
        .error(callback => {
          q.reject(callback);
        })
        .finally((): void => {
          this.endRequest(options.loadingContainerOptions);
        });

      return q.promise;
    }
    delete(options: IRestDeleteOptions): ng.IPromise<any> {
      this.beginRequest(options.loadingContainerOptions);
      var q = this.$q.defer();

      var url = Helpers.getFQUrl(options.url);

      this.$http.delete(url)
        .success((data: any): void => {
          data = this.json.parse(data);
          q.resolve(data);
        })
        .error(callback => {
          q.reject(callback);
        })
        .finally((): void => {
          this.endRequest(options.loadingContainerOptions);
        });

      return q.promise;
    }
  }

  angular
    .module("tip")
    .service("Rest", ["Json", "Notification", "$http", "$q", RestService]);
}
