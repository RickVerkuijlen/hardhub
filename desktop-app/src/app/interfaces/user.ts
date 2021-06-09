export interface User {
    uuid: string;
    name: string;
    email: string;
    roles: string[];
    isArtist?: boolean;
    jwt: string;
}