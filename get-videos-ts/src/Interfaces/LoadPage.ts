import { Page } from "puppeteer";
import LoadPage from "../LoadPage/Index";
import { IError } from "./Helper";

export interface ILoad extends IError {
    loadpage: LoadPage
    page: Page
    response?: any
}
