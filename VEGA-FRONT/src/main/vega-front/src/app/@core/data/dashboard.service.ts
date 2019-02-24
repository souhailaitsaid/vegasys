import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../../services/api/api-request.service';

@Injectable({
  providedIn: 'root'
}
)
export class DashboardService {
  root: string
  constructor(private apiRequestService : ApiRequestService) {
   
  }


  getCatalogsByClient(): Observable<any> {
    return this.apiRequestService.get( 'catalogs/catalogsByClient');
  }
  getDtByStatus(): Observable<any> {
    return this.apiRequestService.get(this.root + '/demandeTravails/byStatus');
  }
  getDtByPersonnel(): Observable<any> {
    return this.apiRequestService.get(this.root + '/demandeTravails/byPersonnel');
  }
  getBtDtByStatus(): Observable<any> {
    return this.apiRequestService.get(this.root + '/demandeTravails/btdtbyStatus');
  }
}
