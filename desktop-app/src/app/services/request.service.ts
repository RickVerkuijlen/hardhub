import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { map, mapTo } from 'rxjs/operators';
import { Song } from '../interfaces/song';
import { Playlist } from '../interfaces/playlist';
import { Artist } from '../interfaces/artist';
import { NewSong } from '../components/artist/new-song/new-song';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSongMp3(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'blob'});
  }

  getAllSongs(): Observable<Song[]>{
    return this.http.get<Song[]>(this._baseUrl + "music/allSongs");
  }
  
  getAllSongsByArtist(id: string): Observable<Song[]> {
    return this.http.get<Song[]>(this._baseUrl + "music/artist/" + id);
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(this._baseUrl + 'music/id/' + id);
  }

  getLinkData<T>(url: string) {
    return this.http.get<T>(url);
  }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this._baseUrl + "artist");
  }

  getArtistById(id: string): Observable<Artist> {
    return this.http.get<Artist>(this._baseUrl + "artist/id/" + id);
  }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this._baseUrl + "playlist");
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(this._baseUrl + 'playlist/' + id);
  }

  updateStreamCount(id: number): void {
    this.http.put(this._baseUrl + "music/id/" + id, null).subscribe();
  }

  addSongToPlaylist(id: number, song: Song) {
    this.http.post(this._baseUrl + "playlist/" + id, JSON.stringify(song));
  }

  getPlaylistByUserId(id: string) {
    return this.http.get(this._baseUrl + "playlist/user/" + id);
  }

  uploadSong(song: NewSong) {
    this.http.post(this._baseUrl + "music", song).subscribe();
  }
}
