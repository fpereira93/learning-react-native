import { ElementHandle, Page } from "puppeteer";
import { IWaitSelector, IWaitSelectorRequest } from "../Interfaces/Index";
import { IError } from "../Interfaces/Helper";
import { merror } from "../Helper/Index";

export default class UsefulPage {

    private static async existsSelector(page: any, selector: string, timeout: number): Promise<boolean> {
        return await page.waitForSelector(selector, { timeout }).then(() => {
            return true
        }).catch(() => {
            return false
        })
    }

    public static async waitQuerySelector(info: IWaitSelectorRequest): Promise<IWaitSelector> {
        return new Promise(async (resolve, reject) => {

            let attempts: number = info.attempts ?? 1

            while (attempts){
                let exists: boolean = true

                if (info.page.constructor.name === 'Page'){
                    exists = await UsefulPage.existsSelector(info.page, info.selector, info.timeout ?? 5000)
                }

                if (exists){
                    const result = await info.page.$$(info.selector)
                    resolve({ elements: result });
                    break;
                }

                attempts--;
            }

            if (attempts == 0){
                reject(merror(['# Exhausted attempts']));
            }
        });

    }

    public static async toArray(listElements: ElementHandle[], next: (element: ElementHandle) => any): Promise<Array<any>>{
        return new Promise(async (resolve, reject) => {
            try {
                const formateds: Array<any> = [];

                for (let index = 0; index < listElements.length; index++) {
                    const element = await listElements[index]
                    const formated = await next(element)

                    if (formated === false){
                        break
                    }

                    formateds.push(formated)
                }

                resolve(formateds)
            } catch (error) {
                reject(error)
            }
        })
    }

    public static async getTextElement(element: ElementHandle | Page, querySelector: string = ''): Promise<string> {
        const elementWithText: any = querySelector ? await element.$(querySelector) : element

        if (elementWithText){
            return (await elementWithText.evaluate((node: any) => node.innerText)).trim()
        }

        return ''
    }

    public static async getPropertyElement(element: ElementHandle, name: string, querySelector: string = ''): Promise<any> {
        const elementWithProperty:any = querySelector ? await element.$(querySelector) : element
    
        if (elementWithProperty){
            return await (await elementWithProperty.getProperty(name)).jsonValue()
        }
    
        return ''
    }
}