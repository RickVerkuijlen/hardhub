import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { Artist } from '../interfaces/artist';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private allArtistsSubject = new ReplaySubject<Artist[]>(1);
  public allArtists$ = this.allArtistsSubject.asObservable();

  constructor(private request: RequestService){}

  getAllArtists(): void {
    this.request.getAllArtists()
    .pipe(
      mergeMap((asIs: Artist[]) => asIs),
      map((artist: Artist) => ({
        ...artist,
        imageId: artist.links.find(k => k.rel == "image").uri
      })),
      toArray()
    ).subscribe((data: Artist[]) => {
      data.forEach((artist: Artist) => {
        artist.isImgLoaded = false;
      })
      this.allArtistsSubject.next(data);
    })
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
