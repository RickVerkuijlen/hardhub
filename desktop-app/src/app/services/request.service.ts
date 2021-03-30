import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getSong() {
    return this.http.get("http://localhost/hello-resteasy/download", {responseType: 'blob'});
  }
}
