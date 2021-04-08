import { Link } from "./link";

export interface Artist {
    id: number,
    name: string,
    imageId: string,
    links: Link[]
}