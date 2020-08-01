import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import _ from 'lodash';

class FormButton extends React.Component {

    constructor(props){
        super(props)

        this.onPressDebounce = _.debounce(this.onPress, 250);
    }

    onPress(){
        this.props.onPress()
    }

    render(){
        return (
            <TouchableOpacity
                style={[style.container, this.props.styleButton]}
                onPress={this.onPressDebounce.bind(this)}
                activeOpacity={0.7}
            >

                <Text style={[style.title, this.props.styleText]}>{ this.props.title }</Text>
            </TouchableOpacity>
        )
    }

}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 17,
        borderRadius: 2.5
    },
    title: {
        color: colors.default,
        fontSize: 15,
        textAlign: 'center',
    },
})

export default FormButton;