
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { ApiRequestService } from '../../services/api/api-request.service';


export abstract class AbstractRestService<T> {
  constructor(protected apiRequest: ApiRequestService,protected actionUrl:string){
  }

  findAll() :Observable<any> {
    return this.apiRequest.get(this.actionUrl)
  }

findById(id: number): Observable<any> {
  return this.apiRequest.get(this.actionUrl + '/find/' + id)
}

save(model: T): Observable<any> {
  console.log(model)
  return this.apiRequest.post(this.actionUrl, model)
}

deleteById(id: number): Observable<any> {
  return this.apiRequest.delete(this.actionUrl + '/' + id)
}

update(model: T): Observable<any> {
  return this.apiRequest.put(this.actionUrl, model)

} 

}
