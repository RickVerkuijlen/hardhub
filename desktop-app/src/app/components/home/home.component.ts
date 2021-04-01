import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../interfaces/song';
import { environment } from '../../../environments/environment';
import { faPlayCircle } from'@fortawesome/free-solid-svg-icons'
import { AudioService } from '../../services/audio.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public song: Song;
  public allSongs: Song[];

  faPlayCircle = faPlayCircle;

  constructor(private songService: SongService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((data: Song[]) => {
      data.forEach(element => {
        element.imageUrl = environment.baseUrl + "music/" + element.imageUrl.replace(/\//g, "|")
        element.songUrl = environment.baseUrl + "music/" + element.songUrl.replace(/\//g, "|")
      });
      console.log(data);
      this.allSongs = data;
      // this.song.imageUrl = data.imageUrl.replace(/\//g, '|');
      // console.log(data);
      // localStorage.setItem("currentSong", JSON.stringify(this.song));
    })
  }

  playSong(song: Song) {
    console.log(song.songUrl);
    localStorage.setItem("currentSong", JSON.stringify(song))
    this.audioService.playStream(song.songUrl).subscribe(events => {

    });
  }
}
