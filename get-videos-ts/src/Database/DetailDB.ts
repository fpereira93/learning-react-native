import { Database, Statement } from "sqlite3"
import moment from 'moment'
import HelperDB from "./HelperDB"
import { IItemMovie, ISyncMovieDetail, IFetchDetails, ISeason, IEpisode } from "../Interfaces/Index"
import { merror, format_column } from "../Helper/Index"
import { IError } from "../Interfaces/Helper"

export default class DetailDB {

    private static async removeMovies(urlDetailList: Array<string>, db: Database): Promise<void>{
        return new Promise(async (resolve, reject) => {
            try {
                const urlsQuoted = urlDetailList.map((detail: string) => `'${detail}'`).join(',')

                const stmt = db.prepare(`delete from movie where url_detail in (${urlsQuoted})`)

                stmt.run((error: Error) => {
                    if (error){
                        reject(merror(['# Error run command to delete list of movies']))
                    } else {
                        stmt.finalize((error: Error) => {
                            if (!error){
                                resolve()
                            } else {
                                reject(merror(['# Error ending command to delete the list of movies']))
                            }
                        })
                    }
                })
            } catch (error) {
                reject(merror(['# Unknown error when trying to delete the movie list']))
            }
        })
    }

    private static async resetDetailMovies(urlDetailList: Array<string>, db: Database): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const urlsQuoted = urlDetailList.map((detail: string) => `'${detail}'`).join(',')

                const query = `
                    delete from serie_season where id_movie in (select id from movie where url_detail in (${urlsQuoted}));
                    delete from error_movie where url_detail in (${urlsQuoted});
                    delete from genres where id_movie in (select id from movie where url_detail in (${urlsQuoted}));
                    update movie set date = null, country = null, duration = null, content_rating = null, url_film = null where url_detail in (${urlsQuoted});
                `;

                db.exec(query, (error: Error | null) => {
                    if (!error){
                        resolve()
                    } else {
                        reject(merror(['# Error run command to reset details of movies']))
                    }
                })
            } catch (error) {
                reject(merror(['# Unknown error when trying to reset the movies details']))
            }
        })
    }

    private static async saveMovies(movies: Array<IItemMovie>, db: Database): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                movies.forEach((movie: IItemMovie, index: number) => {
                    const stmt = db.prepare(`insert into movie (name, sinopse, rating, url_image, url_detail, group_film) values (?, ?, ?, ?, ?, ?)`)

                    stmt.run(
                        format_column(movie.name),
                        format_column(movie.sinopse),
                        format_column(movie.rating),
                        format_column(movie.url_image),
                        format_column(movie.url_detail),
                        format_column(movie.group_film)
                    )

                    stmt.finalize((error: Error) => {
                        if (!error){
                            resolve()
                        } else if (index == movies.length - 1){
                            reject(merror(['# Error trying to insert the movie']))
                        }
                    })
                })
            } catch (error) {
                reject(merror(['# Unknown error when trying to save movies']))
            }
        })
    }

    public static async syncMovies(movies: Array<IItemMovie>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            HelperDB.scope(async (db: Database) => {

                const urlDetailList = movies.map((item: IItemMovie) => item.url_detail)

                await DetailDB.removeMovies(urlDetailList, db).catch((error: IError) => {
                    reject(error)
                    throw error
                })

                await DetailDB.saveMovies(movies, db).catch((error: IError) => {
                    reject(error)
                    throw error
                })

                resolve()
            })
        })
    }

    private static async getKeysMoviesByUrlsDetail(urlDetailList: Array<string>, db: Database): Promise<any> {
        return new Promise(async (resolve, reject) => {

            const urlsQuoted = urlDetailList.map((detail: string) => `'${detail}'`).join(',')

            const query = `select id, url_detail from movie where url_detail in (${urlsQuoted})`;

            db.all(query, (error: Error | null, rows: any) => {
                if (!error){
                    let mapping: any = {}

                    for (let index = 0; index < rows.length; index++) {
                        const movie = rows[index];
                        mapping[movie.url_detail] = movie.id
                    }

                    resolve(mapping)
                } else {
                    reject(merror(['# Error trying to get movie keys']))
                }
            })
        })
    }

    private static async insertSeasonSerie(keyMovie: number, season: ISeason, db: Database): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const stmt = db.prepare('insert into serie_season (sequence, name, id_movie) values (?, ?, ?)')

                stmt.run(
                    format_column(season.sequence),
                    format_column(season.name),
                    format_column(keyMovie),
                function(error: Error) {
                    if (!error){
                        resolve(this.lastID)
                    } else {
                        reject(merror(['# Error trying to insert season']))
                    }
                })
            } catch (error) {
                reject(merror(['# Unknown error when trying to insert season']))
            }
        })
    }

    private static async insertEpisodesSeason(keySeason: number, episodes: Array<IEpisode>, db: Database): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const episodesToInsert: string = episodes.map((episode: IEpisode) => {
                    return `(
                        '${format_column(episode.name)}',
                         ${format_column(keySeason)},
                        '${format_column(episode.url_image)}',
                        '${format_column(episode.url_video)}',
                         ${format_column(episode.sequence)}
                    )`
                }).join(',')

                const query: string = `insert into season_episode (name, id_serie_season, url_image, url_video, sequence) values ${episodesToInsert} `

                db.exec(query, (error: Error | null) => {
                    if (!error){
                        resolve()
                    } else {
                        reject(merror(['# Error run command to insert Episodes']))
                    }
                })
            } catch (error) {
                reject(merror(['# Unknown error when trying to insert episodes']))
            }
        })
    }

    private static async syncDetailSerie(detail: IFetchDetails, db: Database, keyMovie: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const seasons = detail.seasons ?? []

                for (let index = 0; index < seasons.length; index++) {
                    const season: ISeason = seasons[index]
    
                    const keySeason: number = await DetailDB.insertSeasonSerie(keyMovie, season, db).catch((response: IError) => {
                        throw response
                    })

                    if (season.episodes.length == 0){
                        continue
                    }
    
                    await DetailDB.insertEpisodesSeason(keySeason, season.episodes, db).catch((response: IError) => {
                        throw response
                    })
                }

                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    private static async syncDetailFilm(detail: IFetchDetails, db: Database, keyMovie: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                try {
                    const stmt = db.prepare('update movie set date = ?, country = ?, duration = ?, content_rating = ?, url_film = ? where id = ?')
    
                    stmt.run(
                        format_column(detail.extra?.date),
                        format_column(detail.extra?.country),
                        format_column(detail.extra?.duration),
                        format_column(detail.extra?.content_rating),
                        format_column(detail.extra?.url_film),
                        format_column(keyMovie),
                    function(error: Error) {
                        if (!error){
                            resolve(this.lastID)
                        } else {
                            reject(merror(['# Error trying to update detail movie']))
                        }
                    })
                } catch (error) {
                    reject(merror(['# Unknown error when trying to update movie']))
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    private static async syncUrlDetailsJobToday(urlDetailList: Array<string>, db: Database): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const dateToday = moment().format('YYYY-MM-DD H:mm:ss')

                const urlsToInsert: string = urlDetailList.map((url: string) => {
                    return `('${url}', '${dateToday}')`
                }).join(',')

                const query: string = `insert into job_control (url_detail, date) values ${urlsToInsert} `

                db.exec(query, (error: Error | null) => {
                    if (!error){
                        resolve()
                    } else {
                        reject(merror(['# Error run command to insert Urls Job Featch Details']))
                    }
                })
            } catch (error) {
                reject(merror(['# Unknown error when trying to insert Urls Job Featch Details']))
            }
        })
    }

    public static async getUrlsToIgnore(): Promise<Array<string>> {
        return HelperDB.promise(async (db: Database, resolve, reject) => {
            const today = moment().format('YYYY-MM-DD')

            const query: string = `select url_detail from job_control where date(date) = '${today}' and (ignore is null or ignore = 0)`

            db.all(query, (error: Error | null, rows: any) => {
                if (!error){

                    const urls: Array<string> = rows.map((row: any) => {
                        return row.url_detail
                    })

                    resolve(urls)
                } else {
                    reject(merror(['# Error trying to get Urls To Ignore']))
                }
            })
        })
    }

    public static async syncMoviesDetails(detailMovies: Array<ISyncMovieDetail>): Promise<void> {
        return HelperDB.promise(async (db: Database, resolve, reject) => {

            try {
                const urlDetailList: Array<string> = detailMovies.map((item: ISyncMovieDetail) => item.urlDetail)

                await DetailDB.resetDetailMovies(urlDetailList, db).catch((reponse: IError) => {
                    throw reponse
                })

                const keysMovie = await DetailDB.getKeysMoviesByUrlsDetail(urlDetailList, db)

                for (let index = 0; index < detailMovies.length; index++) {
                    const data: ISyncMovieDetail = detailMovies[index]

                    if (data.detail.is_serie){
                        await DetailDB.syncDetailSerie(data.detail, db, keysMovie[data.urlDetail]).catch((response: IError) => {
                            throw response
                        })
                    } else {
                        await DetailDB.syncDetailFilm(data.detail, db, keysMovie[data.urlDetail]).catch((response: IError) => {
                            throw response
                        })
                    }
                }

                DetailDB.syncUrlDetailsJobToday(urlDetailList, db).catch((reponse: IError) => {
                    throw reponse
                })

                console.log('# Resolvido')
                resolve()
            } catch (error) {
                console.log('# Rejeitado')
                reject(error)
            }
        })
    }

    public static async storeErrorMovie(urlDetail: string, text: string): Promise<void> {
        return HelperDB.promise(async (db: Database, resolve, reject) => {
            try {
                try {
                    const stmt = db.prepare('insert into error_movie (url_detail, error_text) values (?, ?)')
    
                    stmt.run(urlDetail, format_column(text), function(error: Error) {
                        if (!error){
                            resolve(this.lastID)
                        } else {
                            reject(merror(['# Error trying to insert error movie']))
                        }
                    })
                } catch (error) {
                    reject(merror(['# Unknown error when trying to insert error movie']))
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}