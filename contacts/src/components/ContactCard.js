import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import colors from '../constants/Colors';

class ContactCard extends React.Component {

    render(){
        return (
            <View style={style.container}>
                <Image style={style.avatar} source={{uri: this.props.avatar.medium}}/>
                <Text style={style.textName}>{this.props.name}</Text>
            </View>
        )
    }

}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    },
    avatar: {
        aspectRatio: 1,
        flex: 1,
        marginLeft: 5,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: colors.default
    },
    textName: {
        flex: 5,
        fontSize: 15,
        marginLeft: 10,
        textTransform: 'capitalize'
    }
})

export default ContactCard;