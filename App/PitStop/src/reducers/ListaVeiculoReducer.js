import { LISTA_VEICULO_USUARIO, LISTA_VEICULO_USUARIO_DROP } from '../actions/types'

const INITIAL_STATE = { dados:[] }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_VEICULO_USUARIO:
            return action.payload
          //  console.log("action.payload", action.payload);
        case LISTA_VEICULO_USUARIO_DROP:
            return {...state, dados: action.payload}
            console.log("teste",action.payload)
        default:
            return state;
    }
}