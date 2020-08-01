import React from 'react';
import {  Picker, View, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

class FormPicker extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.props.value}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.props.onChange(itemValue, itemIndex)}>

                    { this.props.itens.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />) }
                </Picker>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        backgroundColor: colors.transparent,
        borderRadius: 2.5,
    },
    picker: {
        fontSize: 15,
        color: 'white',
    }
})

export default FormPicker;