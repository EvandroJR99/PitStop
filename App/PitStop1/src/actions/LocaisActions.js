import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native';
import b64 from 'base-64';
import _ from 'lodash';
import { soletras, validationEmail } from './validations';
import {
    MODIFICA_NOME_LOCAL,
    MODIFICA_RESPONSAVEL,
    MODIFICA_ENDERECO,
    ADICIONA_LOCAL_SUCESSO,
    ADICIONA_LOCAL_ERRO,
    CADASTRO_EM_ANDAMENTO_LOCAL,
    CADASTRO_LOCAL_ERRO_RESPONSAVEL,
    CADASTRO_LOCAL_ERRO_NOME_LOCAL,
    CADASTRO_LOCAL_ERRO_CAMPOS_VAZIOS,
    LISTA_LOCAIS,
    LISTA_LOCAIS_DROP
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

export const cadastraLocalInt = ({ nomeLocal, responsavel, endereco }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO_LOCAL });
        let enderecoB64 = b64.encode(endereco);

        firebase.database().ref(`/locais/${enderecoB64}`)
            .once('value')
            .then(snapshot => {

                if (snapshot.val()) {
                    dispatch(
                        {
                            type: ADICIONA_LOCAL_ERRO
                        }
                    )
                } else {
                    //adiciona o local
                    firebase.database().ref(`/locais/${enderecoB64}`)
                        .set({ nomeLocal: nomeLocal, responsavel: responsavel, endereco: endereco })
                        .then(() => adicionaLocalSucessoInt(dispatch))
                        .catch(erro => adicionaLocalErro(erro.message, dispatch))
                }
            })


    }
}

export const cadastraLocal = ({ nomeLocal, responsavel, endereco }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO_LOCAL });
        if (nomeLocal == '' || responsavel == '' || endereco == '') {
            dispatch({ type: CADASTRO_LOCAL_ERRO_CAMPOS_VAZIOS });
        } else {
            const validNomeLocal = soletras.exec(nomeLocal);
            if (validNomeLocal) {
                const validResponsavel = soletras.exec(responsavel);
                if (validResponsavel) {
                    let enderecoB64 = b64.encode(endereco);

                    firebase.database().ref(`/locais/${enderecoB64}`)
                        .once('value')
                        .then(snapshot => {

                            if (snapshot.val()) {
                                dispatch(
                                    {
                                        type: ADICIONA_LOCAL_ERRO
                                    }
                                )
                            } else {
                                //adiciona o local
                                firebase.database().ref(`/locais/${enderecoB64}`)
                                    .set({ nomeLocal: nomeLocal, responsavel: responsavel, endereco: endereco })
                                    .then(() => adicionaLocalSucesso(dispatch))
                                    .catch(erro => adicionaLocalErro(erro.message, dispatch))
                            }
                        })
                } else {
                    dispatch({ type: CADASTRO_LOCAL_ERRO_RESPONSAVEL });
                }
            } else {
                dispatch({ type: CADASTRO_LOCAL_ERRO_NOME_LOCAL });
            }
        }
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

const adicionaLocalSucessoInt = (dispatch) => {

    dispatch(
        {
            type: ADICIONA_LOCAL_SUCESSO
        }
    );
}

export const LocaisFetchDropdown = () => {
    return (dispatch) => {
        firebase.database().ref(`/locais/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_LOCAIS_DROP, payload: snapshotToArray(snapshot) })
            })
    }

}

function snapshotToArray(snapshot) {
    var locais = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        locais.push(item);
    });
    return locais;
}

export const locaisFetch = () => {

    return (dispatch) => {
        firebase.database().ref(`/locais`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_LOCAIS, payload: snapshot.val() })
            })
    }
}

export const recuperaInformacoes = (nomeLocal) => {

    var numIntervencoes = 0;
    var somaStar = 0;

    return (dispatch) => {
        firebase.database().ref(`/intervencoes`).child("localInter").equalTo(nomeLocal)
            .on("value", snapshot)
        var valorStar = snapshot.val().starInter;
        numIntervencoes++;
        somaStar += valorStar;
        console.log("somastar:", somaStar);
        console.log("numIntervencoes", numIntervencoes);
    }

}