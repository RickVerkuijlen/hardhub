import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { Song } from '../../interfaces/song';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../interfaces/playlist';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { faCalendarDay, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public playlist$: Observable<Playlist>;
  public songs: Song[];

  faCalendarDay = faCalendarDay;
  faEllipsisH = faEllipsisH;

  constructor(private _Activatedroute: ActivatedRoute, private audioService: AudioService, private playlistService: PlaylistService, public translate: TranslateService) { }

  ngOnInit(): void {
    let id = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(id);
    this.playlist$ = this.playlistService.singlePlaylist$;
  }

  playSong(song: Song): void {
    localStorage.setItem("currentSong", JSON.stringify(song));
    this.audioService.playStream(song).subscribe((events: any) => {
      console.log(events);
      if(events.type == "ended") {
        this.playNextSong();
      }
    });
  }

  private playNextSong(): void {

  }

}
