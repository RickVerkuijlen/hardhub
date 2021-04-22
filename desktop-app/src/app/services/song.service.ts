import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, take, toArray } from 'rxjs/operators';
import { Artist } from '../interfaces/artist';
import { Song } from '../interfaces/song';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private artist: Artist;

  constructor(private request: RequestService) { }

  public getAllSongs(): Observable<any> {
    return this.request.getAllSongs()
    .pipe(
      mergeMap((asIs: Song[]) => asIs),
      map((song: Song) => ({
        ...song,
        songId: song.links.find(k => k.rel == "song").uri,
        imageId: song.links.find(k => k.rel == "image").uri
      })),
      toArray()
    )
  }

  public getArtist(url: string): Observable<Artist> {
    return this.request.getLinkData(url);
  }
}
