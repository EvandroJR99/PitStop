import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, TouchableHighlight, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

const logo = require('../imgs/logo-pit.png');

class formLogin extends Component {

    _autenticarUsuario() {
        const { email, senha } = this.props;

        this.props.autenticarUsuario({ email, senha });
    }

    renderBtnAcessar() {

        if (this.props.loading_login) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="ENTRAR" color='#F9A825' onPress={() => this._autenticarUsuario()} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <StatusBar
                    //hidden
                    backgroundColor='#F99D11'
                    barStyle="light-content"
                />
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#FFF'}}
                    contentContainerStyle={{flexGrow: 1}}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}

                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 200, height: 200 }} source={logo} />
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={{fontSize: 18 }}>Email:</Text>
                        <TextInput
                            value={this.props.email}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder=''
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <Text style={{ paddingTop: 5, fontSize: 18 }}>Senha:</Text>
                        <TextInput
                            secureTextEntry
                            value={this.props.senha}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder=''
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <Text style={{ color: '#ff0000', fontSize: 14 }}>
                            {this.props.erroLogin}
                        </Text>
                        {this.renderBtnAcessar()}
                    </View>
                </KeyboardAwareScrollView>
                <View style={{ flex: 4, justifyContent: 'center' }}>
                    
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
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);
