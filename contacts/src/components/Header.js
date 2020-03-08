import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';

const Header = (props) => (
    <View style={style.container}>
        <Text style={style.title}>{props.title}</Text>
    </View>
)

const style = StyleSheet.create({
    container: {
        backgroundColor: colors.default,
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: 50,
        color: 'white',
    }
})

export default Header;