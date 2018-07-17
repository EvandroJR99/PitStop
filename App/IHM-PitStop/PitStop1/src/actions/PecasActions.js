import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native';
import b64 from 'base-64';
import _ from 'lodash';
import {
    MODIFICA_PECA,
    MODIFICA_DESCRICAO_PECA,
    ADICIONA_PECA_SUCESSO,
    ADICIONA_PECA_ERRO,
    CADASTRO_EM_ANDAMENTO,
    CADASTRO_PECA_ERRO_NOME_PECA,
    CADASTRO_PECA_ERRO_CAMPOS_VAZIOS,
    LISTA_PECA_DROP
} from './types';
import { soletras } from './validations';

export const modificaPeca = (texto) => {
    return {
        type: MODIFICA_PECA,
        payload: texto
    }
}

export const modificaDescricaoPeca = (texto) => {
    return {
        type: MODIFICA_DESCRICAO_PECA,
        payload: texto
    }
}


export const cadastraPeca = ({ peca, descricaoPeca }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO });
        if (peca == '' || descricaoPeca == '') {
            dispatch({ type: CADASTRO_PECA_ERRO_CAMPOS_VAZIOS });
        } else {
            const validPeca = soletras.exec(peca);
            if (validPeca) {
                let pecaB64 = b64.encode(peca);

                firebase.database().ref(`/pecas/${pecaB64}`)
                    .once('value')
                    .then(snapshot => {

                        if (snapshot.val()) {
                            dispatch(
                                {
                                    type: ADICIONA_PECA_ERRO,
                                    payload: 'Esta peça já está cadastrada.'
                                }
                            )
                        } else {
                            //adiciona o peca
                            firebase.database().ref(`/pecas/${pecaB64}`)
                                .set({ nomePeca: peca, descricaoPeca: descricaoPeca })
                                .then(() => adicionaPecaSucesso(dispatch))
                                .catch(erro => adicionaPecaErro(erro.message, dispatch))
                        }
                    })
            } else {
                dispatch({ type: CADASTRO_PECA_ERRO_NOME_PECA });
            }
        }

    }
}

const adicionaPecaErro = (erro, dispatch) => {

    dispatch(
        {
            type: ADICIONA_PECA_ERRO,
            payload: erro.message
        }
    );

}

const adicionaPecaSucesso = (dispatch) => {

    dispatch(
        {
            type: ADICIONA_PECA_SUCESSO
        }
    );
    console.log("peca adicionada com sucesso");
    /*
    Alert.alert(
        'Peca',
        'Peca adicionada com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.principal() },
        ],
        { cancelable: false }
    )
*/
}


export const PecasFetchDropdown = () => {

    return (dispatch) => {
        firebase.database().ref(`/pecas/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_PECA_DROP, payload: snapshotToArray(snapshot) })
            })


    }
}

function snapshotToArray(snapshot) {
    var pecas = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        pecas.push(item);
    });
    return pecas;
}

