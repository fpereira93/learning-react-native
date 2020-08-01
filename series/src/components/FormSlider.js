import React from 'react';
import { Slider, View, StyleSheet, Text } from 'react-native';
import colors from '../constants/Colors';

class FormSlider extends React.Component {

    constructor(props){
        super(props)
    }

    onChange(value){
        this.props.onChange && this.props.onChange(value)
    }

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.containerText}>
                    <Text style={styles.text}>{this.props.label}</Text>
                    <Text style={[styles.text, { textAlign: "right" }]}>{this.props.value}</Text>
                </View>

                <Slider
                    step={this.props.step || 1}
                    value={this.props.value}
                    minimumValue={this.props.min}
                    maximumValue={this.props.max}
                    onValueChange={(value) => this.onChange(value)}

                    minimumTrackTintColor={'white'}
                    maximumTrackTintColor={'white'}
                    thumbTintColor={'white'} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        backgroundColor: colors.transparent,
        borderRadius: 2.5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    containerText: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        color: 'white',
        paddingBottom: 5,
        flex: 1,
    }
})

export default FormSlider;