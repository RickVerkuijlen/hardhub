import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { map, mapTo } from 'rxjs/operators';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSong(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'blob'});
  }

  getAllSongs(): Observable<Song[]>{
    return this.http.get<Song[]>(this._baseUrl + "/music/allSongs");
  }

  getLinkData<T>(url: string) {
    return this.http.get<T>(url);
  }
}
