import { Component, OnInit } from '@angular/core';
import { StreamState } from '../../interfaces/stream-state';
import { AudioService } from '../../services/audio.service';
import { RequestService } from '../../services/request.service';
import { faPlayCircle, faPauseCircle } from'@fortawesome/free-solid-svg-icons'
import { Song } from '../../interfaces/song';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  public state: StreamState;
  public audioSource: string;
  public currentSong: Song;

  private thumbnail;

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;

  constructor(private audio: AudioService, private request: RequestService) { 
    this.currentSong = JSON.parse(localStorage.getItem("currentSong"));
    this.request.getSong(this.currentSong.songUrl).subscribe((data: Blob) => {
      this.audioSource = URL.createObjectURL(data);
    });
    this.audio.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    this.thumbnail = document.getElementById('thumbnail');
    this.thumbnail.style.backgroundImage = "url('"+ this.currentSong.imageUrl + "')";
  }

  playStream(url: string) {
    console.log(this.currentSong);
    this.audio.playStream(url).subscribe(events => {
      
    });
    
  }

  openFile(file: Song): void {
    this.currentSong = file;    
    this.audio.stop();
    this.playStream(file.songUrl);
  }

  pause(): void {
    this.audio.pause();
  }

  play(): void {
    this.audio.play();
  }

  stop(): void {
    this.audio.stop();
  }

  onSliderChangeEnd(change: any) {
    this.audio.seekTo(change.value);
  }

}
