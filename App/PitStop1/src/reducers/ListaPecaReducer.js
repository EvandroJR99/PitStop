import {LISTA_PECA_DROP } from '../actions/types'

const INITIAL_STATE = { dadosPeca:[] }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_PECA_DROP:
            return {...state, dadosPeca: action.payload}
            console.log("PECA: ",action.payload)
        default:
            return state;
    }
}