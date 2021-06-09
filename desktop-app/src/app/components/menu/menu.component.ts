import { Component, OnInit } from '@angular/core';
import { faHome, faBroadcastTower, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { PlaylistService } from '../../services/playlist.service';
import { Observable } from 'rxjs';
import { Playlist } from '../../interfaces/playlist';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  faHome = faHome;
  faRadio = faBroadcastTower;
  faExplore = faSearch;

  public allPlaylists$: Observable<Playlist[]>;

  constructor(public translate: TranslateService, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.getPlaylistByUserId(JSON.parse(localStorage.getItem("user")).uuid);
    this.allPlaylists$ = this.playlistService.allPlaylists$;
  }

}
