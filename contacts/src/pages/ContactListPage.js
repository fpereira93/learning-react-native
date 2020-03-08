import React from 'react';
import axios from 'axios';
import { View , StyleSheet } from 'react-native';
import ContactCardList from  '../components/ContactCardList';

export default class ContactListPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            contacts: []
        }
    }

    mapContacts(contacts) {
        return contacts.map((contact, index) => {
            const {title, first, last} = contact.name;

            return {
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
        const url = 'https://randomuser.me/api/?nat=br&results=15';

        axios.get(url).then(res => {
            this.setState({
                contacts: this.mapContacts(res.data.results)
            });
        })
    }

    onPressContact(contact) {
        this.props.navigation.navigate('contact-view', { contact })
    }

    render(){
        return (
            <View style={style.container}>
                <ContactCardList onPressContact={this.onPressContact.bind(this)} list={this.state.contacts} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})