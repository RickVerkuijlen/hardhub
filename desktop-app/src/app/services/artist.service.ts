import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { Artist } from '../interfaces/artist';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private request: RequestService){}

  getAllArtists(): Observable<any> {
    return this.request.getAllArtists()
    .pipe(
      mergeMap((asIs: Artist[]) => asIs),
      map((artist: Artist) => ({
        ...artist,
        imageId: artist.links.find(k => k.rel == "image").uri
      })),
      toArray()
    );
  }

  getArtistById(id: number): Observable<Artist> {
    return this.request.getArtistById(id)
    .pipe(
      map((artist: Artist) => ({
        ...artist,
        imageId: artist.links.find(k => k.rel == "image").uri
      })),
    )
  }
}
