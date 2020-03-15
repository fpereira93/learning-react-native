import React from 'react';

import colors from '../constants/Colors';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class ContactInfoLine extends React.Component {

    render(){
        return (
            <View style={[style.container, this.props.style]}>
                <Text style={[style.cell, style.cellLabel]}>{this.props.label}</Text>
                <Text style={[style.cell, style.cellValue]}>{this.props.value}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    cell: {
        fontSize: 15,
    },
    cellLabel: {
        fontWeight: 'bold',
        flex: 1,
    },
    cellValue: {
        flex: 3,
        borderLeftColor: colors.gray,
        borderLeftWidth: 0.7,
        paddingLeft: 10
    },
})


export default ContactInfoLine;