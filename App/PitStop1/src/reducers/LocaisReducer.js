import {
    MODIFICA_NOME_LOCAL,
    MODIFICA_RESPONSAVEL,
    MODIFICA_ENDERECO,
    ADICIONA_LOCAL_SUCESSO,
    ADICIONA_LOCAL_ERRO,
    CADASTRO_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO_LOCAL
} from '../actions/types';

const INITIAL_STATE = {
    nomeLocal: '',
    responsavel: '',
    endereco: '',
    adiciona_local_sucesso: '',
    cadastro_em_andamento: false,
    cadastro_em_andamento_local: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_NOME_LOCAL:
            return { ...state, nomeLocal: action.payload }
        case MODIFICA_RESPONSAVEL:
            return { ...state, responsavel: action.payload }
        case MODIFICA_ENDERECO:
            return { ...state, endereco: action.payload }
        case ADICIONA_LOCAL_SUCESSO:
            return {
                ...state,
                nomeLocal: '',
                responsavel: '',
                endereco: '',
                adicona_local_erro: '',
                adiciona_local_sucesso: '',
                cadastro_em_andamento_local: false
            }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, cadastro_em_andamento_local: true }
        default:
            return state;
    }
}