export interface IMarvelResponse {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: any[];
}

export interface IMarvelImage {
    extension: string;
    path: string;
}

export interface IMarvelCharacterProjection {
    id: number;
    name: string;
    thumbnail: IMarvelImage;
}
interface IMarvelCharacter {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: IMarvelUrl[];
    thumbnail: IMarvelImage;
    comics: ComicList;
    stories: any;
    events: any;
    series: any;
}
interface IMarvelComic {
    id: number;
    title: string;
    thumbnail: IMarvelImage;
    description: string;
    resourceURI: string;
    urls: IMarvelUrl[];
    characters: any;
    stories: any;
    events: any;
    creators: any;
}

interface IMarvelComicProjection {
    id: number;
    title: string;
    thumbnail: IMarvelImage;
}
interface IMarvelUrl {
    type: string;
    url: string;
}

interface ComicList {
    available: number;
    returned: number;
    collectionURI: string;
    items: ComicSummary[];
}

interface ComicSummary {
    resourceURI: string;
    name: string;
}
