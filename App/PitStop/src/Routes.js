import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Principal from './components/Principal';
import Automoveis from './components/Automoveis';

export default props => (
    <Router leftButtonIconStyle={{ tintColor: 'white' }}  navigationBarStyle={{ backgroundColor: '#F9A825', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 5,shadowOpacity: 5}} 
            titleStyle={{ color: '#fff'}}>
        <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true} sceneStyle={{ paddingTop: 50 }}/>
        <Scene key='formCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='principal' component={Principal} title="Principal" hideNavBar={true} />
        <Scene key='automoveis' component={Automoveis} title="Automóveis" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
    </Router>
);