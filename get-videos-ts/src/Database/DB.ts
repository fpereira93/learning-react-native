import sqlite3, { Database } from "sqlite3";
import Console from "../Job/Console";

export default class DB {
    private static countTransaction: number = 0;
    private static countInstance: number = 0;
    private static instance: Database;

    public static get(): Database {

        if (DB.countInstance == 0){
            const pathbase = `${process.cwd()}/src/sqlite.db`
            const verbose = sqlite3.verbose()
            DB.instance = new verbose.Database(pathbase)
            DB.instance.run('PRAGMA foreign_keys=ON')
        }

        DB.countInstance++

        return DB.instance;
    }

    private static async executeCommandTransaction(command: string): Promise<any> {
        return new Promise((resolve, reject) => {
            DB.get().run(command, (error) => {
                if (!error){
                    resolve()
                } else {
                    reject(error)
                }
            })
        })
    }

    public static async beginTrans(): Promise<any> {
        if (DB.countTransaction == 0){
            DB.countTransaction++
            return DB.executeCommandTransaction('BEGIN TRANSACTION')
        }

        DB.countTransaction++
    }

    public static async commitTrans(): Promise<any> {
        if (DB.countTransaction){
            DB.countTransaction--
        }

        if (!DB.countTransaction){
            return DB.executeCommandTransaction('COMMIT')
        }
    }

    public static async rollbackTrans(): Promise<any> {
        if (DB.countTransaction){
            DB.countTransaction--
        }

        if (!DB.countTransaction){
            Console.error('Transaction canceled')
            return DB.executeCommandTransaction('ROLLBACK')
        }
    }

    public static transOpened(): boolean {
        return DB.countTransaction > 0
    }

    public static close(): void {
        if (DB.countInstance > 0){
            DB.countInstance--
        }

        if (DB.countInstance == 0){
            DB.instance.close();
        }
    }
}