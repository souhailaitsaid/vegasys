import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';
import { ApiRequestService } from '../../services/api/api-request.service';
import { Observable } from 'rxjs';

export const URI = 'users'

@Injectable({
  providedIn: 'root'
}
)
export class UserService extends AbstractRestService<any>{
  constructor(protected apiRequest: ApiRequestService) {
    super(apiRequest, URI);
  }

  findByUsername(name: string): Observable<any> {
    return this.apiRequest.get(this.actionUrl + '/find/' + `${name}`)
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    let params : HttpParams =  new HttpParams().set('oldPassword',oldPassword).set('newPassword',newPassword)
    return this.apiRequest.get(this.actionUrl + '/changePassword/' + `${username}`, params)
  }


}
