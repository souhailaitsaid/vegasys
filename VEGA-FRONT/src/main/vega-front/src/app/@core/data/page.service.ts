import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';
import { Observable } from 'rxjs';

export const URI = '/pages'

@Injectable({
  providedIn: 'root'
}
)
export class PageService  extends AbstractRestService<any>{
  constructor(private http:HttpClient, private appConfig: AppConfig) {
    super(appConfig,http,URI);
  }

  findAllByCatalogId(id: number): Observable<any>  {
    return this.http.get(this.api_root+URI+'/catalog/' + `${id}`)
  }

  getFiles(clientId :string, catalogId : string): Observable<any> {
    return this.http.get(this.api_root+'/getallfiles/'+ `${clientId}`+'/'+`${catalogId}`)
  }


}
