import puppeteer, { Browser, Page, Cookie } from "puppeteer";
import { exec } from "child_process";
import { ILoad } from "../Interfaces/Index";

export default class LoadPage {

    private countPage: number = 0

    private browserInstance: Promise<Browser>

    constructor(headless: boolean = false){
        this.browserInstance = puppeteer.launch({
            headless: headless,
            ignoreHTTPSErrors: true,
            args: [
                '--unhandled-rejections=strict',
                '--start-maximized',
                '--disable-setuid-sandbox',
                '--no-sandbox',
            ],
            defaultViewport: null
        })
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    public async closePage(page: Page, closeBrowserToo: boolean = true): Promise<void> {
        await page.close()

        if (this.countPage){
            this.countPage--
        }

        if (this.countPage == 0 && closeBrowserToo){
            const pid = (await this.browserInstance).process().pid
            exec(`taskkill /pid ${pid} >nul`)
            await this.sleep(4000)
        }
    }

    public load(url: string, onInterceptRequest?: (request: any) => void): Promise<ILoad> {
        this.countPage++

        return new Promise(async (resolve: any, reject: any) => {

            const browser: Browser = await this.browserInstance

            const page: Page = await browser.newPage()

            const cookies: Cookie[] = await page.cookies(url)
            await page.deleteCookie(...cookies)

            const timeout: number = 10 * 1000 * 60

            try {
                if (onInterceptRequest){
                    await page.setRequestInterception(true)
                    page.on('request', onInterceptRequest)
                }

                await page.goto(url, {waitUntil: 'load', timeout}).then((response) => {
                    resolve({
                        loadpage: this,
                        page,
                        response,
                    })
                }).catch((error) => {
                    reject({
                        loadpage: this,
                        page,
                        errors: ['# Invalid url'],
                    })
                })
            } catch (error) {
                reject({
                    loadpage: this,
                    page,
                    errors: ['# An unknown error when trying to load the page'],
                })
            }
        })
    }

}