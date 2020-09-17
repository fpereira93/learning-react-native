import fs from 'fs'

export default class Log {

    public static async append(fileName: string, text: string): Promise<{ error: NodeJS.ErrnoException | null }> {
        return new Promise((resolve) => {
            fs.appendFile(fileName, text, (error: NodeJS.ErrnoException | null) => {
                resolve({ error })
            })
        })
    }

}