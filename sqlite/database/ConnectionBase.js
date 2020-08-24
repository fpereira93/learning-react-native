import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

export const retrieveDatabase = async () => {

    return await (new Promise(async (resolve, reject) => {
        const uri = Asset.fromModule(require('../assets/produtos.db')).uri
        const toDownload = `${FileSystem.documentDirectory}/produtos.db`

        const info = await FileSystem.getInfoAsync(toDownload)

        if (!info.exists){
            const result = await FileSystem.downloadAsync(uri, toDownload).then(({ status }) => {
                return status === 200
            }).catch(error => {
                return false
            })

            if (result){
                resolve({ success: true, db: SQLite.openDatabase('../produtos.db') })
            } else {
                resolve({ success: false, db: null})
            }
        }  else {
            resolve({ success: true, db: SQLite.openDatabase('../produtos.db') })
        }
    }))

};