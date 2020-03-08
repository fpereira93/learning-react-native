import React from 'react';

import {
    FlatList,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

import ContactCard from './ContactCard'
import colors from '../constants/Colors';
import _ from 'lodash';

class ContactCardList extends React.Component {

    constructor(props){
        super(props);

        this.onPressContactDebounced = _.debounce(this.props.onPressContact, 250);
    }

    componentWillUnmount() {
        this.onPressContactDebounced.cancel();
    }

    render(){
        return (
            <FlatList
                data={this.props.list}
                renderItem={
                    ({item}) => (
                        <TouchableOpacity onPress={this.onPressContactDebounced.bind(this, item)}>
                            <ContactCard {...item} />
                        </TouchableOpacity>
                    )
                }
                ItemSeparatorComponent={ () => <View style={style.separatorContact} /> }
                keyExtractor={(item) => item.name.toString()}
            />
        )
    }

}

const style = StyleSheet.create({
    separatorContact: {
        height: 1,
        backgroundColor: colors.gray
    }
})

export default ContactCardList;