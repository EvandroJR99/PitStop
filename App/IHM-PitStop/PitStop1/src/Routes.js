import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Principal from './components/Principal';
import Automoveis from './components/Automoveis';
import FormVeiculo from './components/FormVeiculo';
import Locais from './components/Locais';
import FormLocais from './components/FormLocais';
import Intervencoes from './components/Intervencoes';
import FormIntervencoes from './components/FormIntervencoes';
import FormIntervencoes2 from './components/FormIntervencoes2';
import FormPeca from './components/FormPeca';
import InformacoesLocais from './components/InformacoesLocais';
import Sobre from './components/Sobre';
import Notificacao from './components/Notificacao';
import InformacoesAutomovel from './components/InformacoesAutomovel';
import EditarAutomovel from './components/EditarAutomovel';
import ExcluirAutomovel2 from './components/ExcluirAutomovel2';
import IntervencoesVeiculo from './components/IntervencoesVeiculo';

export default props => (
    <Router leftButtonIconStyle={{ tintColor: 'white' }}  navigationBarStyle={{ backgroundColor: '#F9A825', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 5,shadowOpacity: 5}} 
            titleStyle={{ color: '#fff'}}>
        <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true} sceneStyle={{ paddingTop: 20 }}/>
        <Scene key='formCadastro' component={FormCadastro} title="Cadastro de Usuário" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='principal' component={Principal} title="Principal" hideNavBar={true} />
        <Scene key='automoveis' component={Automoveis} title="Automóveis" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='formVeiculo' component={FormVeiculo} title="Cadastro de Automóvel" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='locais' component={Locais} title="Locais" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='formLocais' component={FormLocais} title="Cadastro de Local" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='intervencoes' component={Intervencoes} title="Intervenções" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='intervencoesVeiculo' component={IntervencoesVeiculo} title="Intervenções" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='formIntervencoes' component={FormIntervencoes} title="Cadastro de Intervenção" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='formIntervencoes2' component={FormIntervencoes2} title="Cadastro de Intervenção" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='formPeca' component={FormPeca} title="Pecas" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='informacoesLocais' component={InformacoesLocais} title="Informações do Local" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='sobre' component={Sobre} title="Sobre" hideNavBar={false} sceneStyle={{ paddingTop: 50 }} />
        <Scene key='notificacao' component={Notificacao} tittle="Notificações" hideNavBar={false} sceneStyle={{ paddingTop: 50}} />
        <Scene key='informacoesAutomovel' component={InformacoesAutomovel} tittle="Informações do Automóvel" hideNavBar={false} sceneStyle={{ paddingTop: 50}} />
        <Scene key='excluirAutomovel2' component={ExcluirAutomovel2} tittle="Excluir Automóvel" hideNavBar={true} sceneStyle={{ paddingTop: 50}} />
        <Scene key='editarAutomovel' component={EditarAutomovel} tittle="Editar Automóvel" hideNavBar={false} sceneStyle={{ paddingTop: 50}} />
    </Router>
);