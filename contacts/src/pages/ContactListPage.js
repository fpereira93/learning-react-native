import React from 'react';
import axios from 'axios';

import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';

import ContactCardList from  '../components/ContactCardList';
import colors from '../constants/Colors';

export default class ContactListPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            contacts: [],
            loading: true,
            error: false
        }
    }

    mapContacts(contacts) {
        return contacts.map((contact, index) => {
            const {title, first, last} = contact.name;

            return {
                index: index,
                name: `${title} ${first} ${last}`,
                avatar: {
                    large: contact.picture.large,
                    medium: contact.picture.medium,
                    thumbnail: contact.picture.thumbnail,
                },
                email: contact.email,
                phone: contact.phone,
                location: {
                    city: contact.location.city,
                    state: contact.location.state,
                },
                nat: contact.nat,
            }
        });
    }

    componentDidMount() {
        const url = 'https://randomuser.me/api/?nat=br&results=150';

        setTimeout(() => {
            axios.get(url).then(res => {
                this.setState({
                    contacts: this.mapContacts(res.data.results),
                    loading: false,
                });
            }).catch((error) => {
                this.setState({
                    loading: false,
                    error: true,
                });
            })
        }, 1500);
    }

    onPressContact(contact) {
        this.props.navigation.navigate('contact-view', { contact })
    }

    renderContactList(){
        if (!this.state.error){
            return <ContactCardList onPressContact={this.onPressContact.bind(this)} list={this.state.contacts} />
        }

        return <Text style={style.error}>Error on server request</Text>;
    }

    render(){
        return (
            <View style={style.container}>
                {
                    this.state.loading
                    ? <ActivityIndicator style={style.loading} size="large" color={colors.default} />
                    : this.renderContactList()
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    loading: {
        flex: 1,
    },
    error: {
        textAlign: 'center',
        color: colors.gray,
        fontSize: 25
    }
})