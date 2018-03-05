import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native';
import b64 from 'base-64';

export const modificaEmail = (texto) => {
    return {
        type: 'modifica_email',
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: 'modifica_senha',
        payload: texto
    }
}

export const modificaConfSenha = (texto) => {
    return {
        type: 'modifica_senha_conf',
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: 'modifica_nome',
        payload: texto
    }
}

export const modificaData = (date) => {
    return {
        type: 'modifica_data',
        payload: date
    }
}

export const cadastraUsuario = ({ nome, email, senha, confSenha, data }) => {
    return dispatch => {
        if(senha == confSenha){
            firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email); //Criptografa o email
                firebase.database().ref('/usuarios/'+emailB64) //Acho que é assim, mas não tenho certeza se precisa refenciar duas vezes, olhar o BD
                .push({ nome })
                firebase.database().ref('/usuarios/'+emailB64)
                .push({ data })
                .then(value => cadastroUsuarioSucesso(dispatch))
            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
        }else{
            Alert.alert( //É melhor alert ou um text contendo os erros???
                    'Erro',
                    'As senhas digitadas não são iguais.' ,
                   [
                      {text: 'OK', onPress: () => dispatch({ type: 'cadastro_usuario_erro_senha'})},
                   ],
                  { cancelable: false }
                 )
        }
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: 'cadastro_usuario_sucesso' });
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
    dispatch({ type: 'cadastro_usuario_erro', payload: erro.code });
}

