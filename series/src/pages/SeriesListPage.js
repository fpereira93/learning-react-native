import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SerieCard from '../components/SerieCard';

import AddSerieCard from '../components/AddSerieCard';
import { watchSeries } from '../actions/seriesActions';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

class SeriesListPage extends React.Component {

    componentDidMount(){
        this.props.watchSeries();
    }

    onPressCard(serie){
        if (serie.isAddSerie){
            this.props.navigation.navigate('serie-form')
        } else {
            this.props.navigation.navigate('serie-detail', { serie })
        }
    }

    renderItem(item) {
        if (!item.isAddSerie){
            return <SerieCard onPress={this.onPressCard.bind(this, item)} serie={item} />
        }

        return <AddSerieCard onPress={this.onPressCard.bind(this, item)} serie={item} />
    }

    render(){

        if (this.props.series){
            return (
                <View style={styles.container}>
                    <FlatList
                        data={[...this.props.series, { id: Math.random(), isAddSerie: true }]}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                    />
                </View>
            )
        }

        return (
            <Loading show noBackdrop />
        )
    }
}

const mapStateToProps = ({ series }) => {
    if (series === null){
        return { series }
    }

    const keys = Object.keys(series);

    const formated = keys.map((key) => ({
        ...series[key], id: key
    }))

    return { series: formated }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default connect(mapStateToProps, { watchSeries })(SeriesListPage);