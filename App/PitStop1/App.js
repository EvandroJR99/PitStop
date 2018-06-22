import React, { Component } from 'react';
import React from 'react';
import FormLogin from './components/FormLogin';
import Principal from './components/Principal';
import Notificacao from './components/Notificacao';

class App extends Component {

    

    constructor() {
        super();
        this.state = {
          loading: true,
          authenticated: false,
        };
      }
    
      componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loading: false, authenticated: true });
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
      }
    
      render() {
        if (this.state.loading) return null; // Render loading/splash screen etc
    
        if (!this.state.authenticated) {
          return <FormLogin />;
          //return <Notificacao />
        }
    
        return <Principal />;
      }
    
    }