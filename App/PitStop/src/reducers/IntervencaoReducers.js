import {
    MODIFICA_DESCRICAO_INTERVENCAO,
    MODIFICA_VALOR,
    MODIFICA_DATA_INTERVENCAO,
    AUTOMOVEL_ESCOLHIDO,
    MODIFICA_PECA,
    MODIFICA_DESCRICAO_PECA,
    ADICIONA_PECA_ERRO
} from '../actions/types'

const INITIAL_STATE = {
    automovel_intervencao: '',
    descricao_intervencao: '',
    valor_intervencao: '',
    data_intervencao: '',
    peca: '',
    descricaoPeca: ''
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case MODIFICA_DESCRICAO_INTERVENCAO:
            return { ...state, descricao_intervencao: action.payload }
        case MODIFICA_VALOR:
            return { ...state, valor_intervencao: action.payload }
        case MODIFICA_DATA_INTERVENCAO:
            return { ...state, data_intervencao: action.payload }
        case AUTOMOVEL_ESCOLHIDO:
            return { ...state, automovel_intervencao: action.payload }
        case MODIFICA_PECA:
            return { ...state, peca: action.payload }
        case MODIFICA_DESCRICAO_PECA:
            return { ...state, descricaoPeca: action.payload }
        default:
            return state;
    }
}