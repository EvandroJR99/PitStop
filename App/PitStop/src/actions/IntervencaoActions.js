import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import b64 from 'base-64';
import _ from 'lodash';

import {
    MODIFICA_DATA_INTERVENCAO,
    MODIFICA_VALOR,
    MODIFICA_DESCRICAO_INTERVENCAO,
    MODIFICA_VEICULO_INTERVENCAO,
    MODIFICA_PECA_INTERVENCAO,
    MODIFICA_LOCAL_INTERVENCAO,
    ADICIONA_INTERVENCAO_ERRO,
    ADICIONA_INTERVENCAO_SUCESSO,
    CADASTRO_INTERVENCAO_EM_ANDAMENTO,
    LISTA_INTERVENCAO_USUARIO
} from './types';

export const modificaDataIntervencao = texto => {
    return {
        type: MODIFICA_DATA_INTERVENCAO,
        payload: texto
    }
}

export const modificaValor = texto => {
    return {
        type: MODIFICA_VALOR,
        payload: texto
    }
}


export const modificaDescricaoIntervencao = texto => {
    return {
        type: MODIFICA_DESCRICAO_INTERVENCAO,
        payload: texto
    }
}

export const modificaVeiculoIntervencao = texto => {
    return {
        type: MODIFICA_VEICULO_INTERVENCAO,
        payload: texto
    }
}

export const modificaPecaIntervencao = texto => {
    return {
        type: MODIFICA_PECA_INTERVENCAO,
        payload: texto
    }
}

export const modificaLocalIntervencao = texto => {
    return {
        type: MODIFICA_LOCAL_INTERVENCAO,
        payload: texto
    }
}

export const cadastraIntervencao = ({ descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao  }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_INTERVENCAO_EM_ANDAMENTO  });


                    //intervencaos adicionada
                    firebase.database().ref(`/intervencoes/`)
                        .push({ dataInter: data_intervencao, valorInter: valor_intervencao, descricaoInter: descricao_intervencao, veiculoInter: veiculo_intervencao, pecaInter: peca_intervencao, localInter: local_intervencao })
                      //  .then(() => adicionaIntervencaoSucesso(dispatch))
                      //  .catch(erro => adicionaIntervencaoErro(erro.message, dispatch))

                    

                    //relacionamento usuario com veiculo
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_intervencoes/${emailUsuarioB64}`)
                        .push({ dataInter: data_intervencao, valorInter: valor_intervencao, descricaoInter: descricao_intervencao, veiculoInter: veiculo_intervencao, pecaInter: peca_intervencao, localInter: local_intervencao })
                        .then(() => adicionaIntervencaoSucesso(dispatch))
                        .catch(erro => adicionaIntervencaoErro(erro.message, dispatch))
                
    }
}

const adicionaIntervencaoErro = (erro, dispatch) => (
    dispatch (
        {
            type: ADICIONA_INTERVENCAO_ERRO, 
            payload: erro
        }
    )
)

const adicionaIntervencaoSucesso = dispatch => {
    dispatch (
        {
            type: ADICIONA_INTERVENCAO_SUCESSO
        }
    );

    Alert.alert(
        'Cadastrado!',
        'Cadastro de intervenção realizado com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.principal() },
        ],
        { cancelable: false }
    )
}

export const intervencoesUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode( currentUser.email );

        firebase.database().ref(`/usuario_intervencoes/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_INTERVENCAO_USUARIO, payload: snapshot.val() })
            })
    }
}
