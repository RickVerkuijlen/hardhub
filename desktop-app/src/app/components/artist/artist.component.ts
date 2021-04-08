import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../interfaces/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  public artist: Artist;

  constructor(private _Activatedroute: ActivatedRoute, private artistService: ArtistService) { }

  ngOnInit(): void {
    let id = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));
    this.artistService.getArtistById(id).subscribe((data: Artist) => {
      this.artist = data;
      console.log(this.artist);
    });
  }

}
