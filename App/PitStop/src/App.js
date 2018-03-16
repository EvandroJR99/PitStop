import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {

    componentWillMount() {

        firebase.initializeApp({
            apiKey: "AIzaSyBAxC_WEuTln9Q3tOQdgK46zwwhCe5MQA8",
            authDomain: "app-pitstop.firebaseapp.com",
            databaseURL: "https://app-pitstop.firebaseio.com",
            projectId: "app-pitstop",
            storageBucket: "app-pitstop.appspot.com",
            messagingSenderId: "645919936697"
        });
    }

    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
}

export default App;