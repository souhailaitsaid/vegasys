import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}
)
export class DashboardService {
  root: string
  constructor(private http: HttpClient, private config: AppConfig) {
    this.root = this.config.getConfig()
    console.log(this.root)
  }


  getCatalogsByClient(): Observable<any> {
    return this.http.get(this.root + '/catalogs/catalogsByClient');
  }
  getDtByStatus(): Observable<any> {
    return this.http.get(this.root + '/demandeTravails/byStatus');
  }
  getDtByPersonnel(): Observable<any> {
    return this.http.get(this.root + '/demandeTravails/byPersonnel');
  }
  getBtDtByStatus(): Observable<any> {
    return this.http.get(this.root + '/demandeTravails/btdtbyStatus');
  }
}
