import { Page, ElementHandle } from "puppeteer"

import {
    ILoad,
    IWaitSelector,
    IWaitSelectorRequest,
    IItemMovie,
    IMovies,
    IGetURLEpisode,
    IEpisode,
    IExtraFilm,
    IFetchDetails,
    ISeason} from "../Interfaces/Index"

import LoadPage from "../LoadPage/Index"
import { IError } from "../Interfaces/Helper"
import { merror } from "../Helper/Index"
import UsefulPage from "../UsefulPage/Index"

export default class DetailPage {

    private static async getMaxPage(page: Page): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const querySelector = '.pagination span:first-child'
            const elementWithMaxPage: ElementHandle | null = await page.$(querySelector)

            if (elementWithMaxPage){
                const text: string = await elementWithMaxPage.evaluate((node: any) => node.innerText)
                const maxPage = parseInt(text.split('of')[1].trim())
                resolve(maxPage)
            } else {
                reject(merror([ '# Error trying to get the page number' ]))
            }
        })
    }

    private static async mappingMovies(elements: ElementHandle[]): Promise<Array<IItemMovie>> {
        return new Promise(async (resolve, reject) => {
            const movies: Array<IItemMovie> = (
                await UsefulPage.toArray(elements, async (element: ElementHandle) => {
                    const name = await UsefulPage.getTextElement(element, '.details .title')
                    const url_detail = await UsefulPage.getPropertyElement(element, 'href', '.details .title a')
                    const url_image = await UsefulPage.getPropertyElement(element, 'src', 'article .image img')
        
                    const groupFilmes = await UsefulPage.getTextElement(element, 'article .image span.movies')
                    const groupSeries = await UsefulPage.getTextElement(element, 'article .image span.tvshows')
        
                    const group_film = groupFilmes ? groupFilmes : groupSeries;
        
                    const sinopse = await UsefulPage.getTextElement(element, '.details .contenido')
        
                    const yearResult: string = await UsefulPage.getTextElement(element, '.details .meta .year')
                    const year: number | null = yearResult ? parseInt(yearResult) : null
        
                    const ratingResult: string = await UsefulPage.getTextElement(element, '.details .meta .rating')
                    const rating: number | null = ratingResult ? parseFloat(ratingResult.replace(/[^0-9,.]/gi, '')) : null
        
                    const movieData: IItemMovie = {
                        name,
                        sinopse,
                        year,
                        rating,
                        url_image,
                        url_detail,
                        group_film,
                    }

                    return movieData
                })
            )

            resolve(movies)
        })
    }

    public static async fetchMovies(browser: LoadPage, pageNumber: number): Promise<IMovies> {
        return new Promise(async (resolve, reject) => {

            const url = `http://filmesonlinehls.com/page/${pageNumber}/?s`

            let browserInfo: ILoad
            let quantityPage : number

            await browser.load(url).then(async (response: ILoad) => {
                browserInfo = response

                quantityPage = await DetailPage.getMaxPage(response.page).catch((response: IError) => {
                    throw response
                })

                await UsefulPage.waitQuerySelector({
                    page: response.page,
                    selector: '.search-page .result-item',
                }).then(async (response: IWaitSelector) => {
                    const movies: Array<IItemMovie> = await DetailPage.mappingMovies(response.elements ?? []).catch((response: IError) => {
                        throw response
                    })

                    resolve({
                        quantityPage,
                        movies
                    })

                }).catch((response: IError) => {
                    reject(response)
                })

                await response.loadpage.closePage(response.page, false)
            }).catch(async (response: ILoad) => {

                reject(response)

                if (browserInfo){
                    await browserInfo.loadpage.closePage(browserInfo.page, false)
                } else if (response.page){
                    await response.loadpage.closePage(response.page, false)
                }
            })
        })
    }

    private static async isSeriePage(page: Page): Promise<boolean> {

        const request: IWaitSelectorRequest = {
            page,
            selector: '#serie_contenido'
        }

        const isSerie: boolean = await UsefulPage.waitQuerySelector(request).then((response: IWaitSelector) => {
            if (response.elements && response.elements.length > 0){
                return true
            }

            return false
        }).catch(() => false)

        return isSerie;
    }

    private static async getUrlEpisode(browser: LoadPage, urlToSearchUrlVideo: string): Promise<IGetURLEpisode> {

        return new Promise(async (resolve, reject) => {

            const maxAttemps: number = 5
            let attemps: number = 1
            let isSuccess: boolean = false

            let title: string = ''
            let url: string = ''
            let errors: Array<string> = []

            const onInterceptRequest =(request: any) => {
                if (request.url().endsWith('.mp4') && !url){
                    url = request.url()
                }

               request.continue()
            }

            while (attemps <= maxAttemps){

                const responseLoad = (
                    await browser.load(urlToSearchUrlVideo, onInterceptRequest).then(async (response: ILoad) => {

                        const title: string  = await UsefulPage.getTextElement(response.page, '.wp-content .epih3')
                        await response.loadpage.closePage(response.page, false)

                        return title
                    }).catch(async (response: ILoad) => {
                        await response.loadpage.closePage(response.page, false)
                        return response
                    })
                )

                if (typeof responseLoad === 'string'){
                    isSuccess = true
                    title = responseLoad
                    break;
                } else {
                    isSuccess = false
                    errors.push(`# Error on try Fetch title Episode, attemp: ${attemps}`)
                }

                attemps++
            }

            const result: IGetURLEpisode = { title, url }

            if (isSuccess === true){
                resolve(result)
            } else {
                reject(merror(errors))
            }
        })
    }

    private static async getListEpisodes(browser: LoadPage, element: ElementHandle): Promise<ISeason> {
        return new Promise(async (resolve, reject) => {
            try {
                const name: string = (await UsefulPage.getTextElement(element, '.se-q span.title')).replace('▾', '').trim()

                const sequence: number = parseInt(await UsefulPage.getTextElement(element, '.se-q span.se-t'))

                const params = {
                    page: element,
                    selector: 'ul.episodios li',
                }

                const episodes: Array<IEpisode> = await UsefulPage.waitQuerySelector(params).then(async (response: IWaitSelector) => {

                    const converted = await UsefulPage.toArray(response.elements, async (element: ElementHandle) => {

                        const sequence = parseInt((await UsefulPage.getTextElement(element, '.numerando')).replace(/[^0-9]/gi, ''))

                        const url_image = await UsefulPage.getPropertyElement(element, 'src', '.imagen img')

                        const urlToSearchVideo = await UsefulPage.getPropertyElement(element, 'href', '.episodiotitle a')

                        const video: IGetURLEpisode = await DetailPage.getUrlEpisode(browser, urlToSearchVideo).catch((response: IError) =>{
                            throw response
                        })

                        const episode: IEpisode = {
                            name: video.title,
                            url_image,
                            sequence,
                            url_video: video.url
                        }

                        return episode
                    })

                    return converted
                }).catch((response: IError) => {
                    throw response
                })

                const season: ISeason = {
                    name,
                    sequence,
                    episodes
                }

                resolve(season)

            } catch (error) {
                reject(error)
            }
        })
    }

    private static async getInformationSeasons(browser: LoadPage, page: Page): Promise<Array<ISeason>> {
        return new Promise(async (resolve, reject) => {

            const maxAttemps: number = 5
            let errors: Array<string> = []

            let isSuccess: boolean = false
            let attemps: number = 1
            let seasons: Array<ISeason> = []

            while (attemps <= maxAttemps){

                isSuccess = false

                await UsefulPage.waitQuerySelector({
                    page,
                    selector: '#serie_contenido #seasons .se-c',
                }).then(async (response: IWaitSelector) => {
                    seasons = await UsefulPage.toArray(response.elements ?? [], async (element: ElementHandle) => {
                        return await DetailPage.getListEpisodes(browser, element)
                    }).catch((response: IError) => {
                        throw response
                    })

                    isSuccess = seasons.length > 0
                }).catch((response: IError) => {
                    errors = [...errors, ...response.errors]
                })

                if (isSuccess){
                    break
                } else {
                    errors = [...errors, `# Error on try Fetch title Seasons, attemp: ${attemps}`]
                }

                attemps++
            }

            if (isSuccess){
                resolve(seasons)
            } else {
                reject(merror(errors))
            }
        })
    }

    private static async getGenres(page: Page, selector: string): Promise<Array<string>> {
        return new Promise(async (resolve, reject) => {
            const errors: Array<string> = []
            let genres: Array<any> = []

            const selectorPromise: IWaitSelector | void = await UsefulPage.waitQuerySelector({
                page,
                selector
            }).catch(response => {
                errors.push('# Error trying to catch series genres')
            })

            if (selectorPromise){
                genres = await UsefulPage.toArray(selectorPromise.elements, async (element: ElementHandle) => {
                    return await UsefulPage.getTextElement(element)
                })
            }

            if (!genres.length){
                errors.push('# No genres found')
            }

            if (!errors.length){
                resolve(genres)
            } else {
                reject(merror(errors))
            }
        })
    }

    private static async getInfoExtraFilme(page: Page): Promise<IExtraFilm> {
        return new Promise(async (resolve, reject) => {
            let date: string = ''
            let country: string = ''
            let duration: string = ''
            let content_rating: string = ''

            const errors: Array<string> = []

            try {
                date = await UsefulPage.getTextElement(page, '.extra span.date')
                country = await UsefulPage.getTextElement(page, '.extra span.country')
                duration = await UsefulPage.getTextElement(page, '.extra span.runtime')

                const contentRating1 = await UsefulPage.getTextElement(page, '.extra span.contentRating')
                const contentRating2 = await UsefulPage.getTextElement(page, '.extra span.rated')

                content_rating = contentRating1 ?? contentRating2
            } catch (error) {
                errors.push('# Error trying to catch series genres')
            }

            if (!errors.length){
                resolve({
                    date,
                    country,
                    duration,
                    content_rating,
                    url_film: '',
                })
            } else {
                reject(merror(errors))
            }
        })
    }

    public static async fetchDetails(browser: LoadPage, urlDetail: string): Promise<IFetchDetails> {
        return new Promise(async (resolve, reject) => {

            let urlFilm: string = ''

            const onInterceptRequest = (request: any): void => {
                if (request.url().endsWith('.mp4') && !urlFilm){
                    urlFilm = request.url();
                }

                request.continue();
            }

            await browser.load(urlDetail, onInterceptRequest).then(async (response: ILoad) => {
                try {
                    const isSerie: boolean = await DetailPage.isSeriePage(response.page)

                    if (isSerie){
                        const seasons: Array<ISeason> | void = await DetailPage.getInformationSeasons(browser, response.page).catch((response: IError) => {
                            throw response
                        })

                        const genres: Array<string> = await DetailPage.getGenres(response.page, '.seriesGenre a li').catch((response: IError) => {
                            throw response
                        })

                        const seasonData = {
                            is_serie: true,
                            seasons,
                            genres
                        }

                        resolve(seasonData)
                    } else {
                        const genres: Array<string> = await DetailPage.getGenres(response.page, '.sgeneros a').catch((response: IError) => {
                            throw response
                        })

                        const extra: IExtraFilm = await DetailPage.getInfoExtraFilme(response.page).catch((response: IError) => {
                            throw response
                        })

                        extra.url_film = urlFilm

                        const seasonData = {
                            is_serie: false,
                            extra,
                            genres
                        }

                        resolve(seasonData)
                    }
                } catch (error) {
                    reject(error)
                } finally {
                    await response.loadpage.closePage(response.page)
                }
            }).catch(async (response: ILoad) => {
                reject(response)

                await response.loadpage.closePage(response.page, false)
            })

        })
    }
}