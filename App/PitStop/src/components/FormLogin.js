import React from 'react';
import { Image, View, Text, TextInput, Button, TouchableHighlight, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha } from '../actions/AutenticacaoActions';

const logo = require('../imgs/logo-pit.png');

const formLogin = props => {
    return (
        <View style={{ flex: 1, padding: 30 }}>
            <StatusBar
                //hidden
                backgroundColor='#F99D11'
                barStyle="light-content"
            />
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={logo} />
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
                <TextInput value={props.email} style={{ fontSize: 20, height: 45 }} placeholder='E-mail' />
                <TextInput secureTextEntry value={props.senha} style={{ fontSize: 20, height: 45 }} placeholder='Senha' />
                <Button title="Login" color='#F9A825' onPress={() => false} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableHighlight
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={() => Actions.formCadastro()}
                >
                    <Text style={{ fontSize: 14, paddingTop: 30, textAlign: 'center', fontFamily: 'Roboto' }}>Ainda não tem cadastro? Cadastre-se.</Text>
                </TouchableHighlight>
            </View>

        </View>
    );
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha })(formLogin);
