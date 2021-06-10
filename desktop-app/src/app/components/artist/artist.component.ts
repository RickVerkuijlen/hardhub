import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../interfaces/artist';
import { Observable } from 'rxjs';
import { Song } from '../../interfaces/song';
import { SongService } from '../../services/song.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  public allSongs$: Observable<Song[]>;
  public artist$: Observable<Artist>;
  public id: string;
  hidden: boolean = true;

  isCurrentUserArtist = false;

  faPlus = faPlus;
  

  constructor(private _Activatedroute: ActivatedRoute, private artistService: ArtistService, private songService: SongService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.artistService.getArtistById(this.id);
    this.artist$ = this.artistService.artist$;

    this.songService.getAllSongsFromArtist(this.id);
    this.allSongs$ = this.songService.artistSongs$;

    this.artist$.subscribe((artist: Artist) => {
      if(artist.id == JSON.parse(localStorage.getItem("user")).uuid) {
        this.isCurrentUserArtist = true;
      }
    })
    
    
  }

  enableModal(): void {
    this.hidden = false;
  }

}
