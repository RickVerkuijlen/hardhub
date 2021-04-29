import { Link } from './link';
import { Artist } from './artist';
import { Observable } from 'rxjs';

export interface Song {
    id: number,
    name: string,
    artist: Artist,
    artistId?: number,
    addedOn?: Date,
    songId: string,
    imageId: string,
    isImgLoaded?: boolean,
    links: Link[]
}