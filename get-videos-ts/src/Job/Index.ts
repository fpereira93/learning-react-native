import DetailPage from "../DetailPage/Index"
import LoadPage from "../LoadPage/Index"
import { IError } from "../Interfaces/Helper"
import { IMovies, IItemMovie, ISyncMovieDetail, IFetchDetails } from "../Interfaces/Index"
import DetailDB from "../Database/DetailDB"
import Console from "./Console"
import { IFetchDetailsFromPage } from "../Interfaces/Job"
import Log from "./Log"
import HelperDB from "../Database/HelperDB"

export default class Job {

    private static MAX_ATTEMPS = 5

    private static async filterMovies(movies: Array<IItemMovie>): Promise<Array<IItemMovie>> {
        const urlsToIgnore: Array<string> = await DetailDB.getUrlsToIgnore()

        const filtered: Array<IItemMovie> = movies.filter((el: IItemMovie) => {
            return urlsToIgnore.indexOf(el.url_detail) == -1
        })

        return filtered
    }

    private static async getMovieDetail(loadPage: LoadPage, movie: IItemMovie): Promise<ISyncMovieDetail | null> {
        return new Promise (async (resolve) => {
            Console.neutral(`=> Buscando detalhes do filme/seriado: ${movie.url_detail}`)

            let attemps = 1

            while (attemps <= Job.MAX_ATTEMPS){
                Console.warning(`Realizando a ${attemps}° tentativa para buscar detalhes do filme/seriado: ${movie.url_detail}`, 'Tentativa')

                const detailsMovie: IFetchDetails | boolean = await DetailPage.fetchDetails(loadPage, movie.url_detail).catch((response: IError) => {
                    Console.error(response, `Erro ao tentar buscar detalhes do filme/seriado: ${movie.url_detail}`)
                    return false
                })

                if (detailsMovie === false){
                    attemps++
                } else {
                    resolve({
                        urlDetail: movie.url_detail,
                        detail: detailsMovie
                    })
                    break
                }
            }

            if (attemps > Job.MAX_ATTEMPS){
                await DetailDB.storeErrorMovie(
                    movie.url_detail,
                    `Tentativas máxima de ${Job.MAX_ATTEMPS} atingidas ao tentar buscar os detalhes do filme/seriado: ${movie.url_detail}`
                )

                resolve(null)
            }
        })
    }

    private static async fetchAndSaveDetailsFilm(loadPage: LoadPage, movies: Array<IItemMovie>, pageNumber: number): Promise<boolean> {
        return new Promise (async (resolve) => {
            const detailsMovieList: Array<ISyncMovieDetail> = []

            for (let index = 0; index < movies.length; index++) {
                const movieDetail: ISyncMovieDetail | null = await Job.getMovieDetail(loadPage, movies[index])

                if (movieDetail){
                    detailsMovieList.push(movieDetail)
                }
            }

            if (detailsMovieList.length == 0){
                await DetailDB.storeErrorMovie(
                    '<LISTA VAZIA COM DETALHES DOS FILMES/SERIADOS>',
                    `Lista vazia com os detalhes dos filmes/seriados da página: ${pageNumber}`
                )

                resolve(false)
            } else {
                Console.neutral(`=> Salvando os detalhes dos filmes/seriados da página: ${pageNumber}`)

                let attemps = 1

                while (attemps <= Job.MAX_ATTEMPS){
                    Console.warning(`Realizando a ${attemps}° tentativa para salvar detalhes de filmes/seriados na base de dados`, 'Tentativa')

                    const success: boolean = await DetailDB.syncMoviesDetails(detailsMovieList).then(() => {
                        return true
                    }).catch((response: IError) => {
                        Console.error(response, `Erro ao tentar salvar os detalhes dos filmes/seriados na base de dados`)
                        return false
                    })

                    if (!success){
                        attemps++
                    } else {
                        break
                    }
                }

                if (attemps > Job.MAX_ATTEMPS){
                    await DetailDB.storeErrorMovie(
                        '<LISTA COM DETALHES DO FILMES/SERIADOS>',
                        `Tentativas máxima de ${Job.MAX_ATTEMPS} atingidas para salvar a lista com os detalhes dos filmes/seriados da página: ${pageNumber}`
                    )

                    await Log.append('log_errors.txt', `\n\n Página (Details): ${pageNumber} \n ${JSON.stringify(detailsMovieList)}`)
                }

                const fullDetailsSaved = movies.length === detailsMovieList.length

                resolve(fullDetailsSaved)
            }
        })
    }

    private static async fetchDetailsFromPage(loadPage: LoadPage, pageNumber: number): Promise<IFetchDetailsFromPage> {
        return new Promise (async (resolve) => {
            Console.neutral(`=> Buscando todos os filmes e seriados da página: ${pageNumber}`)

            let quantityPage: number = pageNumber

            const success = (
                await DetailPage.fetchMovies(loadPage, pageNumber).then(async (response: IMovies) => {

                    quantityPage = response.quantityPage

                    const movies: Array<IItemMovie> = await Job.filterMovies(response.movies)

                    if (movies.length){
                        Console.neutral(`=> Salvando todos os filmes e seriados da página: ${pageNumber}`)

                        return await DetailDB.syncMovies(movies).then(async () => {
    
                            Console.success(`Filmes da página: ${pageNumber} salvos com sucesso na base de dados`)
                            return await Job.fetchAndSaveDetailsFilm(loadPage, movies, pageNumber)
    
                        }).catch(async (response: IError) => {

                            Console.error(response, `Erro ao tentar salvar filmes e seriados da página: ${pageNumber} na base de dados`)

                            await Log.append('log_errors.txt', `\n\n Página (Movies): ${pageNumber} \n ${JSON.stringify(movies)}`)

                            return false
                        })
                    } else {
                        Console.warning(`Nenhum filme/serie para ser análisado na página: ${pageNumber}`)
                    }

                    return true
                }).catch((response: IError) => {
                    Console.error(response, `Erro ao tentar buscar filmes e seriados da página: ${pageNumber}`)

                    return false
                })
            )

            resolve({
                quantityPage,
                success
            })
        })
    }

    public static async execute(): Promise<void> {
        const loadPage: LoadPage = new LoadPage(true)
        let pageNumber: number = 1
        let quantityPage: number = 0

        while (pageNumber <= quantityPage || quantityPage == 0){
            const result: IFetchDetailsFromPage = await Job.fetchDetailsFromPage(loadPage, pageNumber)

            if (result.success){
                quantityPage = result.quantityPage
            }

            pageNumber++
        }
    }

}