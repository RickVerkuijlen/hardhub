import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  private stream: string;

  constructor(private audio: AudioService, private request: RequestService) { 
    request.getSong().subscribe((data: string) => {
      this.stream = data;
    })
  }

  ngOnInit(): void {
    this.audio.playStream(this.stream);
    this.audio.play();
  }

}
