import firebase from 'firebase';
import b64 from 'base-64';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import {
    MODIFICA_ANO,
    MODIFICA_APELIDO,
    MODIFICA_DATA_REVISAO,
    MODIFICA_PLACA,
    MODIFICA_KM_RECOMENDADA,
    MODIFICA_QUILOMETRAGEM,
    ADICIONA_VEICULO_ERRO,
    ADICIONA_VEICULO_SUCESSO,
    CADASTRO_VEICULO_EM_ANDAMENTO,
    LISTA_VEICULO_USUARIO,
    LISTA_VEICULO_USUARIO_DROP
} from './types';

export const modificaAno = texto => {
    return {
        type: MODIFICA_ANO,
        payload: texto
    }
}

export const modificaApelido = texto => {
    return {
        type: MODIFICA_APELIDO,
        payload: texto
    }
}

export const modificaDataRevisao = texto => {
    return {
        type: MODIFICA_DATA_REVISAO,
        payload: texto
    }
}

export const modificaPlaca = texto => {
    return {
        type: MODIFICA_PLACA,
        payload: texto
    }
}

export const modificaKmRecomendada = texto => {
    return {
        type: MODIFICA_KM_RECOMENDADA,
        payload: texto
    }
}

export const modificaQuilometragem = texto => {
    return {
        type: MODIFICA_QUILOMETRAGEM,
        payload: texto
    }
}

export const cadastraVeiculo = ({ placa, quilometragem, ano, data_revisao, km_recomendada, apelido }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_VEICULO_EM_ANDAMENTO  });
        let placaB64 = b64.encode(placa);

        firebase.database().ref(`/veiculos/${placaB64}`)
            .once('value')
            .then(snapshot => {

                if (snapshot.val()) {
                    dispatch (
                        {
                            type: ADICIONA_VEICULO_ERRO, 
                            payload: 'Já existe um veículo cadastro com a placa digitada.'
                        }
                    )

                } else {
                    //veiculo q queremos adicionar
                    firebase.database().ref(`/veiculos/${placaB64}`)
                        .push({ quilometragem: quilometragem, ano: ano, dataRevisao: data_revisao, kmRecomendada: km_recomendada, apelido: apelido })
                        .then(() => adicionaVeiculoSucesso(dispatch))
                        .catch(erro => adicionaVeiculoErro(erro.message, dispatch))

                    

                    //relacionamento usuario com veiculo
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
                        .push({ placa: placa, apelido: apelido })
                        .then(() => adicionaVeiculoSucesso(dispatch))
                        .catch(erro => adicionaVeiculoErro(erro.message, dispatch))
                }
            })
    }
}

const adicionaVeiculoErro = (erro, dispatch) => (
    dispatch (
        {
            type: ADICIONA_VEICULO_ERRO, 
            payload: erro
        }
    )
)

const adicionaVeiculoSucesso = dispatch => {
    dispatch (
        {
            type: ADICIONA_VEICULO_SUCESSO
        }
    );

    Alert.alert(
        'Cadastrado!',
        'Cadastro do veículo realizado com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.automoveis() },
        ],
        { cancelable: false }
    )
}

export const veiculosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode( currentUser.email );

        firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_VEICULO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const veiculosUsuarioFetchDropdown = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode( currentUser.email );

        firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
            .on("value", snapshot => {
               // dispatch({ type: LISTA_VEICULO_USUARIO, payload: snapshot.val() })
               dispatch({ type: LISTA_VEICULO_USUARIO_DROP, payload: snapshotToArray(snapshot) })
            
            })

            
    }
}

function snapshotToArray(snapshot){
    var items = [];
            snapshot.forEach(function(childSnapshot){
                var item = childSnapshot.val().apelido;
                item.key = childSnapshot.key;
                items.push(item);
            });
        var vetor = items;
        /*
        for( var i in vetor){
            var apelido = vetor[i].apelido;
            console.log("apelido", apelido);
        }
        */
            console.log("OS ITEMAAAA", items.apelido);
            return  items;
}

