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

  // public artist: Artist;

  public allSongs$: Observable<Song[]>;
  public artist$: Observable<Artist>;

  isCurrentUserArtist = false;

  faPlus = faPlus;

  constructor(private _Activatedroute: ActivatedRoute, private artistService: ArtistService, private songService: SongService) { }

  ngOnInit(): void {
    let id = this._Activatedroute.snapshot.paramMap.get('id');

    // await this.artistService.getArtistById(id).subscribe((data: Artist) => {
    //   this.artist = data;
    //   
    // });
    this.artistService.getArtistById(id);
    this.artist$ = this.artistService.artist$;

    this.songService.getAllSongsFromArtist(id);
    this.allSongs$ = this.songService.allSongs$;

    console.log(this.artist$);

    this.artist$.subscribe((artist: Artist) => {
      if(artist.id == JSON.parse(localStorage.getItem("user")).uuid) {
        this.isCurrentUserArtist = true;
      }
    })
    
    
  }

}
