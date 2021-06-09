import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { Artist } from '../interfaces/artist';
import { Link } from '../interfaces/link';
import { Playlist } from '../interfaces/playlist';
import { Song } from '../interfaces/song';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private allPlaylistsSubject = new ReplaySubject<Playlist[]>(1);
  public allPlaylists$ = this.allPlaylistsSubject.asObservable();
  private singlePlaylistSubject = new ReplaySubject<Playlist>(1);
  public singlePlaylist$ = this.singlePlaylistSubject.asObservable();
  private userPlaylistsSubject = new ReplaySubject<Playlist[]>(1);
  public userPlaylists$ = this.userPlaylistsSubject.asObservable();
  private songsSubject = new ReplaySubject<Song[]>(1);
  public songs$ = this.songsSubject.asObservable();

  constructor(private request: RequestService) { }

  public getAllPlaylists(): void {
    this.request.getAllPlaylists()
    .subscribe((data: Playlist[]) => {
      this.allPlaylistsSubject.next(data);
    });
  }

  public getPlaylistByUserId(id: string) {
    this.request.getPlaylistByUserId(id)
    .subscribe((data: Playlist[]) => {
      this.userPlaylistsSubject.next(data);
    })
  }

  public async getPlaylistById(id: number) {
    this.request.getPlaylistById(id)
      .subscribe((data: any) => {
        data.songs = [];
        data.songIds.forEach(async (song: any) => {
          return this.request.getSongById(song.songId)
            .pipe(
              map((song: Song) => ({
                ...song,
                songId: song.links.find(k => k.rel == "song").uri,
                imageId: song.links.find(k => k.rel == "image").uri
              })))
            .subscribe(async (res: any) => {
              console.log(res);
              await this.request.getLinkData(res.links.find(l => l.rel == "artist").uri)
                .subscribe((artist: Artist) => {
                  res.artist = artist;
                });
              res.addedOn = new Date(song.addedOn);
              data.songs.push(res);
            });
        });

        const playlist: Playlist = {
          name: data.name,
          links: data.links,
          songs: data.songs
        };
        console.log(playlist);
        this.singlePlaylistSubject.next(playlist);
        this.songsSubject.next(playlist.songs);
      });
  }

  public addSongToPlaylist(id: number, song: Song) {
    console.log(song);
    this.request.addSongToPlaylist(id, song);
  }
}