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
    // this.request.getSong(this.currentSong.songUrl).subscribe((data: Blob) => {
    //   this.audioSource = URL.createObjectURL(data);
    // });
    this.audio.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    // this.thumbnail = document.getElementById('thumbnail');
    
  }

  playStream(file: Song) {
    console.log(this.currentSong.imageUrl);
    this.thumbnail = this.currentSong.imageUrl;
    this.audio.playStream(file).subscribe(events => {
        console.log(events);
    });
    
  }

  openFile(file: Song): void {
    this.currentSong = file;    
    this.audio.stop();
    this.playStream(file);
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
    console.log(change.value);
    this.audio.seekTo(change.value);
  }

}
