import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../constants/Colors';

class BaseNotLoggedPage extends React.Component {

    render(){
        return (
            <View style={style.container}>

                <View style={style.imageContainer}>
                    <Image style={style.image} source={require('../../assets/icon-login.png')}/>
                </View>

                { this.props.children }

            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.default,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        resizeMode: 'center',
    },
})

export default BaseNotLoggedPage;