import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import colors from './src/constants/Colors';
import firebase from './src/services/firebase';

const {Navigator, Screen} = createStackNavigator();

export default class App extends React.Component {

    componentDidMount(){
        firebase.initialize();
    }

    render(){

        const defaultNavigatorOptions = {
            screenOptions: {
                title: 'Minhas Séries',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colors.default,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 25,
                    textTransform: 'uppercase',
                }
            }
        }

        const options = {
            login: {
                title: 'Login',
                headerShown: false,
            },
            register: {
                title: 'Register',
                headerShown: false,
            },
        }

        return (
            <NavigationContainer>
                <Navigator {...defaultNavigatorOptions}>

                    <Screen name="login" options={options.login} component={LoginPage}/>

                    <Screen name="register" options={options.register} component={RegisterPage}/>

                </Navigator>
            </NavigationContainer>
          )
    }
}