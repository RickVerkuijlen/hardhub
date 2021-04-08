import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../interfaces/song';
import { environment } from '../../../environments/environment';
import { faPlayCircle } from'@fortawesome/free-solid-svg-icons'
import { AudioService } from '../../services/audio.service';
import { ControlsComponent } from '../controls/controls.component';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public song: Song;
  public allSongs: Song[];

  private _baseUrl = environment.baseUrl;

  @ViewChild(ControlsComponent) thumbnail: ControlsComponent;

  faPlayCircle = faPlayCircle;

  constructor(private songService: SongService, private audioService: AudioService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.songService.getAllSongs()
    .subscribe((data: Song[]) => {
      data.forEach((song: Song) => {
        this.songService.getArtist(song.links.find(x => x.params.rel == "artist").uri)
        .subscribe(artist => {
          song.artist = artist;
        })
      })
      this.allSongs = data;
    });
  }

  playSong(song: Song) {
    localStorage.setItem("currentSong", JSON.stringify(song))
    this.audioService.playStream(song).subscribe(events => {
    });
  }
}
