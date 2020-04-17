import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  public urlAPI: string = 'http://localhost:3000/api/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private _http: HttpClient) { }

  getAllvyraz():Observable<any>{
    return this._http.get(this.urlAPI);
  }

  post(vyraz: object):Observable<any>{
    return this._http.post(this.urlAPI, JSON.stringify(vyraz), this.httpOptions);
  }
}
