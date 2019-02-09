import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';

export const URI = '/statutDemandeTravails'

@Injectable({
  providedIn: 'root'
}
)
export class StatutDemandeTravailService  extends AbstractRestService<any>{
  constructor(private http:HttpClient, private appConfig: AppConfig) {
    super(appConfig,http,URI);
  }


}
