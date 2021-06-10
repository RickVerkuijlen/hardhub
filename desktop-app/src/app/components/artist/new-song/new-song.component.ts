import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewSong } from './new-song';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent {

  model = new NewSong();
  imageSrc: string;

  @Input("artistId")
  artistId: string;

  @Input("artistName")
  artistName: string;

  constructor(public translate: TranslateService) {}

  onSubmit() {
    this.model.artistId = this.artistId;
    console.log(this.model);
  }

  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        console.log(reader.result as string)
        this.imageSrc = reader.result as string;
    
      };
    
    }
  }

}
