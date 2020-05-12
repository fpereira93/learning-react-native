import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import rootReducer from './reducers';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

export default class TodoApp extends React.Component {

    render(){
        return (
            <Provider store={store}>
                <View style={style.container}>
                    <TodoForm />
                    <TodoList />
                </View>
            </Provider>
        )
    }

}

const style = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 5,
        flex: 1,
        flexDirection: 'column'
    }
})