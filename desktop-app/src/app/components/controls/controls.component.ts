import { Component, OnInit } from '@angular/core';
import { StreamState } from '../../interfaces/stream-state';
import { AudioService } from '../../services/audio.service';
import { RequestService } from '../../services/request.service';
import { faPlayCircle, faPauseCircle } from'@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  public state: StreamState;
  public audioSource: string;

  private thumbnail;

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;

  constructor(private audio: AudioService, private request: RequestService) { 
    this.request.getSong().subscribe((data: Blob) => {
      console.log("asdf")
      this.audioSource = URL.createObjectURL(data);
    });
    this.audio.getState().subscribe(state => {
      this.state = state;
    })
  }

  ngOnInit(): void {
    this.thumbnail = document.getElementById('thumbnail');
    console.log(this.thumbnail);
  }

  playStream(url: string) {
    console.log(url);
    this.audio.playStream(url).subscribe(events => {
      
    });
  }

  openFile(file): void {
    this.audio.stop();
    console.log(this.audioSource);
    this.playStream(this.audioSource);
    this.thumbnail.style.backgroundImage = "url('https://i.ytimg.com/vi/4WLzj3MFj3w/maxresdefault.jpg;')";
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
