import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SongService } from '../../../services/song.service';
import { NewSong } from './new-song';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent {

  model = new NewSong();
  imageSrc: string;
  musicSrc: string;

  @Input("artistId")
  artistId: string;

  @Input("artistName")
  artistName: string;

  constructor(public translate: TranslateService, private songService: SongService) {}

  onSubmit() {

    this.model.artistId = this.artistId;
    
    this.songService.uploadSong(this.model)
  }

  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.model.thumbnail = file;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.imageSrc = reader.result as string;
    
      };
    
    }
  }

  onMusicChange(event) {
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.model.song = file;
    
    }
  }

}
