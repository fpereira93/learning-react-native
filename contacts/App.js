import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ContactListPage from './src/pages/ContactListPage';
import ContactViewPage from './src/pages/ContactViewPage';
import colors from './src/constants/Colors';

const Stack = createStackNavigator();

export default class App extends React.Component {

    render(){

        const styleHeader = {
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 25,
            },
            headerTitleAlign: 'center'
        }

        const optionsContact = {
            title: 'Contacts',
            ...styleHeader
        }

        const optionsContactView = {
            title: 'Contact Details',
            headerTintColor: 'white',
            ...styleHeader
        }

        return (
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen name="contacts" component={ContactListPage} { ...{options: optionsContact} } />

                    <Stack.Screen name="contact-view" component={ContactViewPage} { ...{options: optionsContactView} } />

                </Stack.Navigator>
            </NavigationContainer>
          )
    }
}