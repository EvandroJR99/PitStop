import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native';
import b64 from 'base-64';
import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_SENHA_CONF,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO
} from './types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaConfSenha = (texto) => {
    return {
        type: MODIFICA_SENHA_CONF,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = ({ nome, email, senha, confSenha }) => {
    return dispatch => {
        if (senha == confSenha) {
            firebase.auth().createUserWithEmailAndPassword(email, senha)
                .then(user => {
                    let emailB64 = b64.encode(email); //Criptografa o email
                    firebase.database().ref('/usuarios/' + emailB64) //Acho que é assim, mas não tenho certeza se precisa refenciar duas vezes, olhar o BD
                        .push({ nome })
                        .then(value => cadastroUsuarioSucesso(dispatch))
                })
                .catch(erro => cadastroUsuarioErro(erro, dispatch));
        } else {
            Alert.alert( //É melhor alert ou um text contendo os erros???
                'Erro',
                'As senhas digitadas não são iguais.',
                [
                    { text: 'OK', onPress: () => dispatch({ type: 'cadastro_usuario_erro_senha' }) },
                ],
                { cancelable: false }
            )
        }
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_SUCESSO });
    Alert.alert(
        'Bem vindo!',
        'Cadastro realizado com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.formLogin() },
        ],
        { cancelable: false }
    )
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: erro.code });
}

export const autenticarUsuario = ({ email, senha }) => {

    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }
}

const loginUsuarioSucesso = (dispatch) => {
    dispatch(
        {
            type: LOGIN_USUARIO_SUCESSO
        }
    );

    Actions.principal();
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch(
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    );
}