import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../interfaces/song';
import { AudioService } from '../../services/audio.service';
import { ArtistService } from '../../services/artist.service';
import { TranslateService } from '@ngx-translate/core';
import { Artist } from '../../interfaces/artist';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public song: Song;
  public allSongs: Song[];
  public allArtist: Artist[];

  constructor(private songService: SongService, private artistService: ArtistService, private audioService: AudioService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.songService.getAllSongs()
    .subscribe((data: Song[]) => {
      data.forEach((song: Song) => {
        this.songService.getArtist(song.links.find(x => x.params.rel == "artist").uri)
        .subscribe(artist => {
          song.artist = artist;
        })
      })
      console.log(data);
      this.allSongs = data;
    });

    this.artistService.getAllArtists()
    .subscribe((data: Artist[]) => {
      console.log(data);
      this.allArtist = data;
    })
  }

  playSong(song: Song) {
    localStorage.setItem("currentSong", JSON.stringify(song))
    this.audioService.playStream(song).subscribe(events => {
    });
  }
}
