import {
    MODIFICA_NOME_LOCAL,
    MODIFICA_RESPONSAVEL,
    MODIFICA_ENDERECO,
    ADICIONA_LOCAL_SUCESSO,
    ADICIONA_LOCAL_ERRO,
    CADASTRO_EM_ANDAMENTO_LOCAL,
    CADASTRO_LOCAL_ERRO_RESPONSAVEL,
    CADASTRO_LOCAL_ERRO_NOME_LOCAL,
    CADASTRO_LOCAL_ERRO_CAMPOS_VAZIOS
} from '../actions/types';

const INITIAL_STATE = {
    nomeLocal: '',
    responsavel: '',
    endereco: '',
    adiciona_local_sucesso: '',
    adiciona_local_erro: '',
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
                adiciona_local_erro: '',
                adiciona_local_sucesso: '',
                cadastro_em_andamento_local: false
            }
        case CADASTRO_LOCAL_ERRO_RESPONSAVEL:
            return { ...state, adiciona_local_erro: 'O nome do responsável digitado é incorreto.', cadastro_em_andamento_local: false }
        case  CADASTRO_LOCAL_ERRO_NOME_LOCAL:
            return { ...state, adiciona_local_erro: 'O nome do local digitado é incorreto.', cadastro_em_andamento_local: false }
        case CADASTRO_LOCAL_ERRO_CAMPOS_VAZIOS:
            return { ...state, adiciona_local_erro: 'Todos o campos são obrigatórios.', cadastro_em_andamento_local: false }
        case ADICIONA_LOCAL_ERRO:
            return { ...state, adiciona_local_erro: 'Este local ja esta cadastrado.', cadastro_em_andamento_local: false }
        case CADASTRO_EM_ANDAMENTO_LOCAL:
            return { ...state, cadastro_em_andamento_local: true}
        default:
            return state;
    }
}