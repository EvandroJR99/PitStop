import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';

export default props => (
    <Router sceneStyle={{ paddingTop: 50 }} leftButtonIconStyle={{ tintColor: 'white' }}  navigationBarStyle={{ backgroundColor: '#F9A825', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 5,shadowOpacity: 5}} 
            titleStyle={{ color: '#fff'}}>
        <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true}/>
        <Scene key='formCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false} />
    </Router>
);