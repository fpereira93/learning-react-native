import React from 'react';

import colors from '../constants/Colors';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class ContactInfoLine extends React.Component {

    render(){

        const style = StyleSheet.create({
            container: {
                display: 'flex',
                flexDirection: 'row',
                padding: 15,
                borderRadius: 5,
                borderWidth: 0.7,
                borderColor: colors.gray
            },
            cell: {
                fontSize: 15
            },
            cellLabel: {
                fontWeight: 'bold',
            },
        })

        return (
            <View style={[style.container, this.props.style]}>
                <Text style={[style.cell, style.cellLabel]}>{this.props.label}</Text>
                <Text style={style.cell}>{this.props.value}</Text>
            </View>
        )
    }

}

export default ContactInfoLine;