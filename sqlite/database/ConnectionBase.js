import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

export const downloadDB = async () => {

    return await (new Promise(async (resolve, reject) => {
        const uri = Asset.fromModule(require('../assets/produtos.db')).uri
        const toDownload = `${FileSystem.documentDirectory}/banco_dados.db`

        const info = await FileSystem.getInfoAsync(toDownload)

        if (!info.exists){
            console.log('NAO EXISTE :(');

            const result = await FileSystem.downloadAsync(uri, toDownload).then(({ status }) => {
                return status === 200
            }).catch(error => {
                console.log('Error o make dir => ', error)
                return false
            })

            resolve({ db: SQLite.openDatabase('../banco_dados.db') })
        }  else {
            console.log('EXISTE :)');
            resolve({ db: SQLite.openDatabase('../banco_dados.db') })
        }
    }))
};