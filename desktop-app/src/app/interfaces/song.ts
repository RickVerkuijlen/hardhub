import { Link } from './link';
import { Artist } from './artist';
import { Observable } from 'rxjs';

export interface Song {
    id: number,
    name: string,
    artist: Artist,
    songId: string,
    imageId: string,
    links: Link[]
}