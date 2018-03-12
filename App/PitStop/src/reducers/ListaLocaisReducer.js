import { LISTA_LOCAIS } from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_LOCAIS:
            return action.payload
        default:
            return state;
    }
}