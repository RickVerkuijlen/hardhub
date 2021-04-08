import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StreamState } from '../../interfaces/stream-state';
import { AudioService } from '../../services/audio.service';
import { RequestService } from '../../services/request.service';
import { faPlayCircle, faPauseCircle, faVolumeUp, faVolumeDown } from'@fortawesome/free-solid-svg-icons'
import { Song } from '../../interfaces/song';
import { environment } from '../../../environments/environment'
import { EventEmitter } from 'events';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  public state: StreamState;
  public audioSource: string;
  public currentSong: Song;
  public thumbnail;

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;
  faVolumeUp = faVolumeUp;
  faVolumeDown = faVolumeDown;

  constructor(private audio: AudioService, private request: RequestService) { 
    this.currentSong = JSON.parse(localStorage.getItem("currentSong"));
    this.request.getSong(this.currentSong.songId).subscribe((data: Blob) => {
      this.audioSource = URL.createObjectURL(data);
    });
    this.audio.getState().subscribe(state => {
      this.state = state;
    });
    this.playStream(this.currentSong)
    this.pause();
  }

  ngOnInit(): void {
    // this.thumbnail = document.getElementById('thumbnail');
    
  }

  playStream(file: Song) {
    console.log(this.currentSong.imageId);
    this.thumbnail = this.currentSong.imageId;
    this.audio.playStream(file).subscribe(events => {});
    
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

  onTimeSliderChangeEnd(change: any) {
    console.log(change.value);
    this.audio.seekTo(change.value);
  }

  onVolumeSliderChange(change: any) {
    this.audio.volumeTo(change.value / 100);
  }

}
