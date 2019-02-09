import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { AbstractRestService } from './abstract-rest.service';

export const URI = '/classifications'

@Injectable({
  providedIn: 'root'
}
)
export class ClassificationService  extends AbstractRestService<any>{
  constructor(private http:HttpClient, private appConfig: AppConfig) {
    super(appConfig,http,URI);
  }


}