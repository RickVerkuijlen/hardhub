import { Link } from './link';
import { Song } from './song';

export interface Playlist {
    name: string;
    songs: Song[];
    links: Link[];
}