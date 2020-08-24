import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
 }

export const retrieveDatabase = async () => {

    return await (new Promise(async (resolve, reject) => {

        let databaseName;

        if (__DEV__){
            databaseName = `database_${makeid(15)}.db`;
        } else {
            databaseName = 'produtos.db';
        }

        const uri = Asset.fromModule(require('../assets/produtos.db')).uri
        const toDownload = `${FileSystem.documentDirectory}/${databaseName}`

        const info = await FileSystem.getInfoAsync(toDownload)

        if (!info.exists){
            const result = await FileSystem.downloadAsync(uri, toDownload).then(({ status }) => {
                return status === 200
            }).catch(error => {
                return false
            })

            if (result){
                resolve({ success: true, db: SQLite.openDatabase(`../${databaseName}`) })
            } else {
                resolve({ success: false, db: null})
            }
        }  else {
            resolve({ success: true, db: SQLite.openDatabase(`../${databaseName}`) })
        }
    }))

};