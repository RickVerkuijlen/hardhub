import { Injectable } from '@angular/core';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { map, mergeMap, take, toArray } from 'rxjs/operators';
import { Artist } from '../interfaces/artist';
import { Song } from '../interfaces/song';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private allSongsSubject = new ReplaySubject<Song[]>(1);
  public allSongs$ = this.allSongsSubject.asObservable();
  private artistSongsSubject = new ReplaySubject<Song[]>(1);
  public artistSongs$ = this.artistSongsSubject.asObservable();

  constructor(private request: RequestService) { }

  public getAllSongs(): void {
    this.request.getAllSongs()
    .pipe(
      mergeMap((asIs: Song[]) => asIs),
      map((song: Song) => ({
        ...song,
        songId: song.links.find(k => k.rel == "song").uri,
        imageId: song.links.find(k => k.rel == "image").uri
      })),
      toArray()
    ).subscribe((data: Song[]) => {
      data.forEach((song: Song) => {
        this.getArtist(song.links.find(x => x.rel == "artist").uri)
        .subscribe(artist => {
          song.artist = artist;
          song.isImgLoaded = false;
        })
      })
      this.allSongsSubject.next(data);
    })
  }

  public getAllSongsFromArtist(id: string) {
    console.log(id)
    this.request.getAllSongsByArtist(id).pipe(
      mergeMap((asIs: Song[]) => asIs),
      map((song: Song) => ({
        ...song,
        songId: song.links.find(k => k.rel == "song").uri,
        imageId: song.links.find(k => k.rel == "image").uri
      })),
      toArray()
    ).subscribe((data: Song[]) => {
      data.forEach((song: Song) => {
        this.getArtist(song.links.find(x => x.rel == "artist").uri)
        .subscribe(artist => {
          song.artist = artist;
          song.isImgLoaded = false;
        })
      })
      console.log(data);
      this.artistSongsSubject.next(data);
    })
  }

  public getArtist(url: string): Observable<Artist> {
    return this.request.getLinkData(url);
  }

  public updateStreamCount(id: number): void {
    return this.request.updateStreamCount(id);
  }
}
