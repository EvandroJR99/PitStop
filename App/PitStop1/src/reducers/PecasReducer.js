import {
    MODIFICA_PECA,
    MODIFICA_DESCRICAO_PECA,
    ADICIONA_PECA_SUCESSO,
    ADICIONA_PECA_ERRO,
    CADASTRO_EM_ANDAMENTO
} from '../actions/types';

const INITIAL_STATE = {
    peca: '',
    descricaoPeca: '',
    adiciona_peca_sucesso: '',
    cadastro_em_andamento: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_PECA:
            return { ...state, peca: action.payload }
        case MODIFICA_DESCRICAO_PECA:
            return { ...state, descricaoPeca: action.payload }
        case ADICIONA_PECA_SUCESSO:
            return {
                ...state,
                peca: '',
                descricaoPeca: '',
                adicona_peca_erro: '',
                adiciona_peca_sucesso: '',
                cadastro_em_andamento: false
            }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, cadastro_em_andamento: true }
        default:
            return state;
    }
}