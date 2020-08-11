import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SerieImage from './SerieImage';

class SerieCard extends React.Component {

    constructor(props){
        super(props);

        this.onPressDebounced = _.debounce(this.onPressCard, 250);
    }

    onPressCard(){
        this.props.onPress();
    }

    getContainerView(serie){
        return (
            <View style={styles.container}>
                <View style={styles.card}>

                    <SerieImage {...serie} style={{ flex: 1 }} />

                    <View style={styles.cardTitleWrapper}>
                        <Text style={styles.cardTitle}>{serie.title}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { serie } = this.props

        if (this.props.onPress){
            return (
                <TouchableOpacity onPress={this.onPressDebounced.bind(this)}>
                    { this.getContainerView(serie) }
                </TouchableOpacity>
            )
        }

        return this.getContainerView(serie)
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 0.8,
        height: Dimensions.get('window').width / 2,
    },
    card: {
        flex: 1,
        borderWidth: 1,
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        opacity: .8,
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default SerieCard;