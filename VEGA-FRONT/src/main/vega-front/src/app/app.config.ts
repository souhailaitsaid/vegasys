import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}
)
export class AppConfig {
  private appConfig;

  constructor(private injector: Injector) { }

  loadAppConfig() {
    let http = this.injector.get(HttpClient);
    return http.get('assets/env/env-host-definition.json')
      .toPromise()
      .then((data: any) => {
        console.log(data)
        var hostName = window.location.hostname
        console.log(hostName)
        var config = data
          .find(config => ((config.hostName !== '' && config.hostName === hostName) || (config.ip != '' && config.ip === hostName)));

        var configFileToLoad;
        if (config) {
          configFileToLoad = config.configFile;
        } else {
          console.error("Env could not be detected. Loading DEV properties");
          configFileToLoad = 'app-config-DEV.json';
        }
        return http.get('assets/env/' + configFileToLoad)
          .toPromise()
          .then(data => {
            console.log(data)
            return this.appConfig = data;
          });
      });
  }

  getConfig() {
    return this.appConfig.api_root;
    //return 'http://'+window.location.hostname+':8086'
  }
}