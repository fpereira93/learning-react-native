import React from 'react';
import { View, StyleSheet } from 'react-native';

class FormRow extends React.Component {

    render(){
        return (
            <View style={[style.container, this.props.style]}>
                { this.props.children }
            </View>
        )
    }

}

const style = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
})

export default FormRow;