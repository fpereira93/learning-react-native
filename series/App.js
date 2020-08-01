import React from 'react';
import SeriesApp from "./src/SeriesApp";
import firebase from './src/services/firebase';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Setting a timer for a long period of time'
]);

export default class App extends React.Component {
    componentDidMount(){
        firebase.initialize();
    }

    render(){
        return <SeriesApp />
    }
}