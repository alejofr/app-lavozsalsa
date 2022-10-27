import { Pagination } from './';
export interface CoverMusic extends Music{}

export interface CoverMusicData{
    data: CoverMusic[];
    pagination: Pagination;
}

export interface CoverAlbunesData{
    data: CoverAlbun[];
    pagination: Pagination;
}

export interface CoverPlaylistsData{
    data: CoverPlaylist[];
    pagination: Pagination;
}

export interface Music {
    position: string;
    _id: string;
    thumbnail: string;
    name: string;
    duration: number;
    url: string;
    artist: Artist;
    urlGetMusicFile: string;
}

export interface CoverPlayListUser{
    id: number;
    name: string;
    countMusic: number;
    musics: Music[];
}

export interface CoverSearchMusicArtist extends CoverMusic {
    tag: 'music' | 'artist';
    artist:     Artist;
    artist_id: string;
}

export interface CoverAlbun extends CoverMusic {
    artist: Artist;
    image: string;
}

export interface CoverPlaylist extends CoverMusic {
    description: string;
}


export interface Artist {
    first_name:   string | null;
    second_name: string | null;
}
