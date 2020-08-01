import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import colors from './constants/Colors';
import SeriesListPage from './pages/SeriesListPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

const {Navigator, Screen} = createStackNavigator();

export default class Router extends React.Component {

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
                }
            }
        }

        const options = {
            login: {
                title: 'Login',
                headerShown: false,
            },
            register: {
                title: 'Registrar',
                headerShown: false,
            },
            seriesListPage: {
                title: 'Lista de Séries',
                headerShown: true,
            },
            serieDetail: ({ route }) => {
               const { serie } = route.params

                return {
                    title: serie.title,
                    headerShown: true,
                }
            },
            serieForm: ({ route }) => {

                let isEdit = false;

                if (route.params){
                    isEdit = route.params.serieToEdit.id ? true : false
                }

                return {
                     title: isEdit ? 'Editar Série' : 'Nova Série',
                     headerShown: true,
                 }
             },
        }

        return (
            <NavigationContainer>
                <Navigator {...defaultNavigatorOptions}>

                    <Screen name="login" options={options.login} component={LoginPage}/>

                    <Screen name="register" options={options.register} component={RegisterPage}/>

                    <Screen name="serie-form" options={options.serieForm} component={SerieFormPage}/>

                    <Screen name="series-list" options={options.seriesListPage} component={SeriesListPage}/>

                    <Screen name="serie-detail" options={options.serieDetail} component={SerieDetailPage}/>

                </Navigator>
            </NavigationContainer>
          )
    }
}
