import { Component, OnInit, HostListener } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../interfaces/song';
import { AudioService } from '../../services/audio.service';
import { ArtistService } from '../../services/artist.service';
import { PlaylistService } from '../../services/playlist.service';
import { TranslateService } from '@ngx-translate/core';
import { Artist } from '../../interfaces/artist';
import { ContextMenuModel } from '../../interfaces/context-menu-model';
import { Playlist } from '../../interfaces/playlist';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public song: Song;
  public allSongs$: Observable<Song[]>;
  public allArtist$: Observable<Artist[]>;
  public allPlaylists$: Observable<Playlist[]>;

  public username: string

  isImgLoaded: boolean = false;

  isDisplayContextMenu: boolean;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;

  constructor(
    private songService: SongService, 
    private artistService: ArtistService, 
    private playlistService: PlaylistService, 
    private audioService: AudioService, 
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')).name;

    this.songService.getAllSongs()
    this.allSongs$ = this.songService.allSongs$;

    this.artistService.getAllArtists();
    this.allArtist$ = this.artistService.allArtists$;
    
    this.playlistService.getAllPlaylists()
    this.allPlaylists$ = this.playlistService.allPlaylists$;
  }

  playSong(song: Song) {
    localStorage.setItem("currentSong", JSON.stringify(song))
    this.audioService.playStream(song).subscribe(events => {
    });
  }

  displayContextMenu(event, song: Song) {
    this.isDisplayContextMenu = true;

    this.rightClickMenuItems = [
      {
        menuText: 'Add to playlist',
        menuData: song,
        menuEvent: 'Handle add to playlist'
      },
      {
        menuText: 'Like',
        menuData: song,
        menuEvent: 'Handle like'
      }
    ];

    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;
  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event): void {
    console.log(this.rightClickMenuItems[0].menuEvent)
    console.log(this.rightClickMenuItems[1].menuEvent)
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
           this.playlistService.addSongToPlaylist(1, this.rightClickMenuItems[1].menuData);
           break;
      case this.rightClickMenuItems[1].menuEvent:
          console.log('To handle formatting');
    }
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }
}
