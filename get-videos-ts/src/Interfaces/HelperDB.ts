import { Database } from "sqlite3";

export interface ICallback {
    (db: Database) : Promise<any>
}

export interface IPromise {
    (db: Database, resolve: (result?: any) => void, reject: (result?: any) => void): Promise<any>
}