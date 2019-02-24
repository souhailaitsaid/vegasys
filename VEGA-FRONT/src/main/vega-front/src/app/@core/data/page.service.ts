import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../../services/api/api-request.service';

export const URI = 'pages'

@Injectable({
  providedIn: 'root'
}
)
export class PageService  extends AbstractRestService<any>{
  constructor(protected apiRequest: ApiRequestService) {
    super(apiRequest,URI);
  }

  findAllByCatalogId(id: number): Observable<any>  {
    return this.apiRequest.get(URI+'/catalog/' + `${id}`)
  }

  getFiles(clientId :string, catalogId : string): Observable<any> {
    return this.apiRequest.get('getallfiles/'+ `${clientId}`+'/'+`${catalogId}`)
  }

  getApiRequest(){
    return this.apiRequest
  }


}
