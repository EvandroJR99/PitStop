import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import b64 from 'base-64';
import { soletras, validationEmail } from './validations';
import _ from 'lodash';

import {
    MODIFICA_ANO,
    MODIFICA_APELIDO,
    MODIFICA_APELIDO2,
    MODIFICA_DATA_REVISAO,
    MODIFICA_PLACA,
    MODIFICA_KM_RECOMENDADA,
    MODIFICA_QUILOMETRAGEM,
    ADICIONA_VEICULO_ERRO,
    ADICIONA_VEICULO_SUCESSO,
    CADASTRO_VEICULO_EM_ANDAMENTO,
    CADASTRO_VEICULO_ERRO_CAMPOS_VAZIOS,
    CADASTRO_VEICULO_ERRO_APELIDO,
    CADASTRO_VEICULO_ERRO_PLACA,
    LISTA_VEICULO_USUARIO,
    LISTA_VEICULO_USUARIO_DROP,
    ATUALIZA_VEICULO_ERRO,
    ATUALIZA_VEICULO_SUCESSO,
    ATUALIZA_VEICULO_EM_ANDAMENTO,
    EXCLUI_VEICULO_ERRO,
    EXCLUI_VEICULO_SUCESSO,
    EXCLUI_VEICULO_EM_ANDAMENTO
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

export const modificaApelido2 = texto => {
    return {
        type: MODIFICA_APELIDO2,
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
        if(placa == '' || quilometragem == '' || ano == '' || data_revisao == '' || km_recomendada == '' || apelido == ''){
            dispatch({ type: CADASTRO_VEICULO_ERRO_CAMPOS_VAZIOS });
        }else{
            const validApelido = soletras.exec(apelido);
            if(validApelido){
                if(placa.length >= 7 && placa.length <=8){
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
                                .push({ placa: placa, apelido: apelido, ano: ano, quilometragem: quilometragem, dataRevisao: data_revisao, kmRecomendada: km_recomendada })
                                .then(() => adicionaVeiculoSucesso(dispatch))
                                .catch(erro => adicionaVeiculoErro(erro.message, dispatch))
                        }
                    })
                }else{
                    dispatch({ type: CADASTRO_VEICULO_ERRO_PLACA });
                }
                
            }else{
                dispatch({ type: CADASTRO_VEICULO_ERRO_APELIDO });
            }
        }
    }
}


export const atualizaAutomovel = ({ placa, quilometragem, ano, data_revisao, km_recomendada, apelido }) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_VEICULO_EM_ANDAMENTO });
        const { currentUser } = firebase.auth();
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                const ref = firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`);
                //firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
                ref.once("value")
                .then((veiculosSnapshot) => {
                    veiculosSnapshot.forEach((childSnapshot) => {
                        console.log("childSnapshot", childSnapshot);
                        ref.set({ placa, quilometragem, ano, data_revisao, km_recomendada, apelido })
                        .then(() => atualizaVeiculoSucesso(dispatch))
                        .catch(erro => atualizaVeiculoErro(erro.message, dispatch))
                    });          
                });      
            }else {
                dispatch (
                    {
                        type: ATUALIZA_VEICULO_ERRO, 
                        payload: 'ERRO AO ATUALIZAR AUTOMÓVEL.'
                    }
                )
            }
        });
    }


}

export const excluirAutomovel = ({ placa, quilometragem, ano, data_revisao, km_recomendada, apelido }) => {
    return dispatch => {
        dispatch({ type: EXCLUI_VEICULO_EM_ANDAMENTO });
        const { currentUser } = firebase.auth();
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                        const ref = firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`);
                        //firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
                        ref.once("value")
                        .then((veiculosSnapshot) => {
                            veiculosSnapshot.forEach((childSnapshot) => {
                                console.log("childSnapshot", childSnapshot);
                                if(childSnapshot.val().placa == placa ){
                                    console.log("childSnapshot.key DENTRO DO IF", childSnapshot.key);
                                    ref.child(childSnapshot.key).remove()
                                           .then(() => excluiVeiculoSucesso(dispatch))
                                           .catch(erro => excluiVeiculoErro(erro.message, dispatch))
                                        }
                            })
                        });
            } else {
                dispatch (
                    {
                        type: EXCLUI_VEICULO_ERRO, 
                        payload: 'ERRO AO EXLCUIR AUTOMÓVEL.'
                    }
                )
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
            { text: 'OK', onPress: () => Actions.principal() },
        ],
        { cancelable: false }
    )
}

//EDICAO
const atualizaVeiculoErro = (erro, dispatch) => (
    dispatch (
        {
            type: ATUALIZA_VEICULO_ERRO, 
            payload: erro
        }
    )
)

const atualizaVeiculoSucesso = dispatch => {
    dispatch (
        {
            type: ATUALIZA_VEICULO_SUCESSO
        }
    );

    Alert.alert(
        'Atualizado!',
        'As informações do automóvel foram realizadas com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.principal() },
        ],
        { cancelable: false }
    )
}
//FIM

//exclusao
const excluiVeiculoErro = (erro, dispatch) => (
    dispatch (
        {
            type: EXCLUI_VEICULO_ERRO, 
            payload: erro
        }
    )
)

const excluiVeiculoSucesso = dispatch => {
    dispatch (
        {
            type: EXCLUI_VEICULO_SUCESSO
        }
    );

    Alert.alert(
        'Exlcuído!',
        'Exclusão do veículo realizada com sucesso!',
        [
            { text: 'OK', onPress: () => Actions.principal() },
        ],
        { cancelable: false }
    )
}
//fimExlcusao

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
                var item = childSnapshot.val();
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

/*
export const recuperaInformacoesAutomovel = (placa) => {

    return (dispatch) => {
        const { currentUser } = firebase.auth();
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                        const ref = firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`);
                        ref.once("value")
                        .then((veiculosSnapshot) => {
                            veiculosSnapshot.forEach((childSnapshot) => {
                                console.log("childSnapshot", childSnapshot);
                                if(childSnapshot.val().placa == placa ){
                                    ref.child(childSnapshot.key)
                                }
                            })
                        });
                    }
            });         
    }

}
*/