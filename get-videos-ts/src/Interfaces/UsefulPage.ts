import { ElementHandle, Page } from "puppeteer";

export interface IWaitSelectorRequest {
    page: Page | ElementHandle
    selector: string
    attempts?: number
    timeout?: number
}

export interface IWaitSelector {
    elements: ElementHandle[]
}
