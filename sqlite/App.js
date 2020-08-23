import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { downloadDB } from './database/ConnectionBase'

export default function App() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        downloadDB().then((response) => {
            const db = response.db;
    
            db.transaction(tx => {
                const query = 'select * from product;';
    
                tx.executeSql(query, [], (_, response) => {
                    setProducts(response.rows._array);
                }, (trans, error) => {
                    console.log(error)
                });
            });
        })
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({item}) => {
                    return (
                        <View style={styles.item}>
                            <Text style={{flex: 1, fontSize: 20}}>Code: {item.id}</Text>
                            <Text style={{flex: 3, fontSize: 20}}>Name: {item.name}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    item: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        borderWidth: .5,
        marginTop: 3,
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 30,
    },
});
