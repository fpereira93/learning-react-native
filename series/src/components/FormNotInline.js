import React from 'react';
import { StyleSheet, Text } from 'react-native';
import FormRow from './FormRow';

class FormNotInline extends React.Component {

    render(){
        return (
            (this.props.message || '').length ?
                <FormRow>
                    <Text style={[
                        style.text,
                        style[this.props.type || 'error']
                    ]}>{this.props.message}</Text>
                </FormRow>
            :
                null
        )
    }

}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        borderColor: 'white',
        borderRadius: 2.5,
    },
    error: {
        backgroundColor: 'rgba(255, 118, 117, 0.4)',
    },
    warning: {
        backgroundColor: 'rgba(253, 203, 110, 0.4)',
    },
    success: {
        backgroundColor: 'rgba(0, 184, 148, 0.4)',
    }
})

export default FormNotInline;