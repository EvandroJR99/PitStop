import { LISTA_LOCAIS, LISTA_LOCAIS_DROP } from '../actions/types'

const INITIAL_STATE = { dadosLocais: [] }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_LOCAIS:
            return action.payload
        case LISTA_LOCAIS_DROP:
            return {...state, dadosLocais: action.payload}
        default:
            return state;
    }
}