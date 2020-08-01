import React from 'react';
import Router from './Router';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class SeriesApp extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}