import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';
import { Observable } from 'rxjs';

export const URI = '/catalogs'

@Injectable({
  providedIn: 'root'
}
)
export class CatalogService  extends AbstractRestService<any>{
  constructor(private http:HttpClient, private appConfig: AppConfig) {
    super(appConfig,http,URI);
  }

  findAllByClientId(id: number): Observable<any>  {
    return this.http.get(this.api_root+URI+'/client/' + id)
  }


}
