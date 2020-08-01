import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

class AddSerieCard extends React.Component {

    constructor(props){
        super(props);

        this.onPressDebounced = _.debounce(this.onPressCard, 250);
    }

    onPressCard(){
        this.props.onPress();
    }

    render() {
        const { serie } = this.props

        return (
            <TouchableOpacity onPress={this.onPressDebounced.bind(this)}>
                <View style={styles.container}>
                    <Image
                        source={require('../../resources/plus.png')}
                        aspectRatio={1}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 0.8,
        height: Dimensions.get('window').width / 2,
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
    }
})

export default AddSerieCard;