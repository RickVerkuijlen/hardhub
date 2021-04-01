import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSong(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'blob'});
  }

  getAllSongs(): Observable<Object>{
    return this.http.get(this._baseUrl + "music/test");
  }
}
