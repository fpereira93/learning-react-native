import { Database } from "sqlite3"
import DB from "./DB"
import { ICallback, IPromise } from "../Interfaces/Index"

export default class HelperDB {

    private static queueScopes: Array<ICallback> = []
    private static semaphoreRed: boolean = false

    private static registerScope(next: ICallback): void {
        HelperDB.queueScopes.push(next)
    }

    private static async executeScope(): Promise<any> {
        if (HelperDB.queueScopes.length && !HelperDB.semaphoreRed){
            HelperDB.semaphoreRed = true

            const next: ICallback | undefined = HelperDB.queueScopes.shift()

            try {
                await DB.beginTrans()

                if (next){
                    await next(DB.get()).catch((error: any) => {
                        throw error
                    })
                }

                await DB.commitTrans()
            } catch (error) {
                await DB.rollbackTrans()
            } finally {
                HelperDB.semaphoreRed = false
                await HelperDB.executeScope()
            }
        }
    }

    public static scope(next: ICallback): void {
        HelperDB.registerScope(next)
        HelperDB.executeScope()
    }

    public static promise(callback: IPromise): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            HelperDB.scope(async (db: Database) => {

                try {
                    await callback(db, resolve, reject)
                } catch (error) {
                    reject()
                }

                return promise
            })
        })

        return promise
    }
}


