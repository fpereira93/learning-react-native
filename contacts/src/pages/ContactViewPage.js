import React from 'react';
import {
    View,
    ScrollView ,
    Image,
    StyleSheet
} from 'react-native';
import colors from '../constants/Colors';
import ContactInfoLine from '../components/ContactInfoLine';

class ContactViewPage extends React.Component {
    
    constructor(props){
        super(props);

        this.contact = props.route.params.contact;

        console.log(this.contact );
    }

    render(){
        return (
            <View style={style.container}>
                <ScrollView style={style.detailScroll}>
                <Image style={style.image} source={{uri: this.contact.avatar.large}}/>

                    <ContactInfoLine label='Name: ' value={this.contact.name} style={style.line}/>

                    <ContactInfoLine label='Email: ' value={this.contact.email} style={style.line}/>

                    <ContactInfoLine label='Phone: ' value={this.contact.phone} style={style.line}/>

                    <ContactInfoLine label='City: ' value={this.contact.location.city} style={style.line}/>

                    <ContactInfoLine label='State: ' value={this.contact.location.state} style={style.line}/>

                    <ContactInfoLine label='Nationality: ' value={this.contact.nat} style={style.line}/>

                </ScrollView >
            </View>
        )
    }

}

const style = StyleSheet.create({
    container: {
        padding: 5,
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        aspectRatio: 1,
        borderRadius: 300,
        marginBottom: 5,
        borderWidth: 0.5,
        borderColor: colors.default
    },
    detailScroll: {
        elevation: 1,
        display: 'flex',
    },
    line: {
        marginTop: 10,
    }
})

export default ContactViewPage;