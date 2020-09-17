export interface IItemMovie {
    name: string
    sinopse: string
    year: number | null
    rating: number | null
    url_image: string
    url_detail: string
    group_film: string
}

export interface IMovies {
    quantityPage: number
    movies: Array<IItemMovie>
}

export interface IGetURLEpisode {
    title: string
    url: string
}

export interface IEpisode {
    name: string
    url_image: string
    sequence: number
    url_video: string
}

export interface ISeason {
    sequence: number
    name: string
    episodes: Array<IEpisode>
}

export interface IExtraFilm {
    date: string
    country: string
    duration: string
    content_rating: string
    url_film: string
}

export interface IFetchDetails {
    is_serie: boolean
    seasons?: Array<ISeason>
    extra?: IExtraFilm
    genres: Array<string>
}
