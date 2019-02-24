import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';
import { ApiRequestService } from '../../services/api/api-request.service';

export const URI = 'clients'

@Injectable({
  providedIn: 'root'
}
)
export class ClientService  extends AbstractRestService<any>{
  constructor(protected apiRequest: ApiRequestService) {
    super(apiRequest,URI);
  }


}
