import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../../services/api/api-request.service';

export const URI = 'catalogs'

@Injectable({
  providedIn: 'root'
}
)
export class CatalogService  extends AbstractRestService<any>{
  constructor(protected apiRequest: ApiRequestService) {
    super(apiRequest,URI);
  }

  findAllByClientId(id: number): Observable<any>  {
    return this.apiRequest.get(URI+'/client/' + + `${id}`)
  }


}
