import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private request: RequestService) { }

  public getAllSongs(): Observable<Object> {
    return this.request.getAllSongs();
  }

  // public getSong()
}
