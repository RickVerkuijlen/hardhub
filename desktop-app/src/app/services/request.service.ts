import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getSong() {
    return this.http.get("http://localhost/music/gpf|from-within|HEADHUNTERZ-FROM_WITHIN_(GPF_OFFICIAL_REMIX).mp3", {responseType: 'blob'});
  }
}
