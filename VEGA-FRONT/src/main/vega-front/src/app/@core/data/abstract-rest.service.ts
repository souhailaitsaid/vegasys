
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';


export abstract class AbstractRestService<T> {
  api_root: string

  constructor(private config: AppConfig, protected _http: HttpClient, protected actionUrl:string){
    this.api_root = this.config.getConfig()
  }

  findAll() :Observable<any> {
    return this._http.get(this.api_root+this.actionUrl)
  }

findById(id: number): Observable<any> {
  return this._http.get(this.api_root+this.actionUrl + '/find/' + id)
}

save(model: T): Observable<any> {
  console.log(model)
  return this._http.post(this.api_root+this.actionUrl, model)
}

deleteById(id: number): Observable<any> {
  return this._http.delete(this.api_root+this.actionUrl + '/' + id)
}

update(model: T): Observable<any> {
  return this._http.put(this.api_root+this.actionUrl, model)

} 

}
