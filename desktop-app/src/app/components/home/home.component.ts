import { Component, OnInit, HostListener } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../interfaces/song';
import { AudioService } from '../../services/audio.service';
import { ArtistService } from '../../services/artist.service';
import { TranslateService } from '@ngx-translate/core';
import { Artist } from '../../interfaces/artist';
import { ContextMenuModel } from '../../interfaces/context-menu-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public song: Song;
  public allSongs: Song[];
  public allArtist: Artist[];

  public username: string

  isImgLoaded:boolean = false;

  isDisplayContextMenu: boolean;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;

  constructor(private songService: SongService, private artistService: ArtistService, private audioService: AudioService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')).name;
    this.songService.getAllSongs()
    .subscribe((data: Song[]) => {
      data.forEach((song: Song) => {
        this.songService.getArtist(song.links.find(x => x.rel == "artist").uri)
        .subscribe(artist => {
          song.artist = artist;
          song.isImgLoaded = false;
        })
      })
      console.log(data);
      this.allSongs = data;
    });

    this.artistService.getAllArtists()
    .subscribe((data: Artist[]) => {
      console.log(data);
      data.forEach((artist: Artist) => {
        artist.isImgLoaded = false;
      })
      this.allArtist = data;
    })
  }

  playSong(song: Song) {
    localStorage.setItem("currentSong", JSON.stringify(song))
    this.audioService.playStream(song).subscribe(events => {
    });
  }

  displayContextMenu(event, songId: number) {
    this.isDisplayContextMenu = true;

    this.rightClickMenuItems = [
      {
        menuText: 'Add to playlist',
        menuData: songId,
        menuEvent: 'Handle add to playlist'
      },
      {
        menuText: 'Like',
        menuData: songId,
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
           console.log(this.rightClickMenuItems[0].menuData);
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
