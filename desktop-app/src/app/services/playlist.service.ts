import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Playlist } from '../interfaces/playlist';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private request: RequestService) { }

  public getAllPlaylists(): Observable<Playlist[]> {
    return this.request.getAllPlaylists();
  }
}

// mergeMap((asIs: Song[]) => asIs),
//       map((song: Song) => ({
//         ...song,
//         songId: song.links.find(k => k.rel == "song").uri,
//         imageId: song.links.find(k => k.rel == "image").uri
//       })),
//       toArray()