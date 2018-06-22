import { LISTA_INTERVENCAO_USUARIO} from '../actions/types'

const INITIAL_STATE = { dados:[] }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_INTERVENCAO_USUARIO:
            return action.payload
          //  console.log("action.payload", action.payload);
        default:
            return state;
    }
}