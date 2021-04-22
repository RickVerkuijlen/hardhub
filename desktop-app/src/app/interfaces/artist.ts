import { Link } from "./link";

export interface Artist {
    id: number,
    name: string,
    imageId: string,
    isImgLoaded?: boolean,
    links: Link[]
}