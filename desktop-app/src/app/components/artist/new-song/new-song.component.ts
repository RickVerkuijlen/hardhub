import { Component, OnInit } from '@angular/core';
import { NewSong } from './new-song';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent {

  model: NewSong;

  onSubmit() {
    console.log(this.model);
  }

}
