import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native';
import b64 from 'base-64';
import _ from 'lodash';
import {
    MODIFICA_NOME_LOCAL,
    MODIFICA_RESPONSAVEL,
    MODIFICA_ENDERECO,
    ADICIONA_LOCAL_SUCESSO,
    ADICIONA_LOCAL_ERRO,
    CADASTRO_EM_ANDAMENTO
} from './types';

export const modificaNomeLocal = (texto) => {
    return {
        type: MODIFICA_NOME_LOCAL,
        payload: texto
    }
}

export const modificaResponsavel = (texto) => {
    return {
        type: MODIFICA_RESPONSAVEL,
        payload: texto
    }
}

export const modificaEndereco = (texto) => {
    return {
        type: MODIFICA_ENDERECO,
        payload: texto
    }
}

export const cadastraLocal = ({ nomeLocal, responsavel, endereco }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO });
        let enderecoB64 = b64.encode(endereco);

        firebase.database().ref(`/locais/${enderecoB64}`)
            .once('value')
            .then(snapshot => {

                if (snapshot.val()) {
                    dispatch(
                        {
                            type: ADICIONA_LOCAL_ERRO,
                            payload: 'Este local ja esta cadastrado.'
                        }
                    )
                } else {
                    //adiciona o local
                    firebase.database().ref(`/locais/${enderecoB64}`)
                        .push({ nomeLocal: nomeLocal, responsavel: responsavel, endereco: endereco })
                        .then(() => adicionaLocalSucesso(dispatch))
                        .catch(erro => adicionaLocalErro(erro.message, dispatch))
                }
            })


    }
}

const adicionaLocalErro = (erro, dispatch) => {

    dispatch(
        {
            type: ADICIONA_LOCAL_ERRO,
            payload: erro.message
        }
    );

}

const adicionaLocalSucesso = (dispatch) => {

    dispatch(
        {
            type: ADICIONA_LOCAL_SUCESSO
        }
    );

    Alert.alert(
        'Local',
        'Local adicionado com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.principal() },
        ],
        { cancelable: false }
    )
}



