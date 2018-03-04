import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';

export default props => (
    <Router leftButtonIconStyle={{ tintColor: 'white' }}  navigationBarStyle={{ backgroundColor: '#FBC02D', borderBottomColor: 'transparent', borderBottomWidth: 0}} 
            titleStyle={{ color: '#fff'}}>
        <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true}/>
        <Scene key='formCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false} leftButtonImage={{uri:'https://www.materialui.co/materialIcons/navigation/close_grey_192x192.png'}}
 />
    </Router>
);