import {
    MODIFICA_DESCRICAO_INTERVENCAO,
    MODIFICA_VALOR,
    MODIFICA_DATA_INTERVENCAO,
    MODIFICA_VEICULO_INTERVENCAO,
    MODIFICA_PECA_INTERVENCAO,
    MODIFICA_LOCAL_INTERVENCAO,
    MODIFICA_STAR_INTERVENCAO,
    ADICIONA_INTERVENCAO_ERRO,
    ADICIONA_INTERVENCAO_SUCESSO,
    CADASTRO_INTERVENCAO_EM_ANDAMENTO,
    LISTA_INTERVENCAO_USUARIO
} from '../actions/types'



const INITIAL_STATE = {
    descricao_intervencao: '',
    valor_intervencao: '',
    data_intervencao: '',
    veiculo_intervencao: '',
    peca_intervencao: '',
    local_intervencao: '',
    star_intervencao: '',
    adiciona_intervencao_erro: '',
    cadastro_intervencao_em_andamento: false
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_DESCRICAO_INTERVENCAO:
            return { ...state, descricao_intervencao: action.payload }
        case MODIFICA_VALOR:
            return { ...state, valor_intervencao: action.payload }
        case MODIFICA_DATA_INTERVENCAO:
            return { ...state, data_intervencao: action.payload }
        case MODIFICA_VEICULO_INTERVENCAO:
            return { ...state, veiculo_intervencao: action.payload }
        case MODIFICA_PECA_INTERVENCAO:
            return { ...state, peca_intervencao: action.payload }
        case MODIFICA_LOCAL_INTERVENCAO:
            return { ...state, local_intervencao: action.payload }
        case MODIFICA_STAR_INTERVENCAO:
            return { ...state, star_intervencao: action.payload }
        case ADICIONA_INTERVENCAO_ERRO:
            return { ...state, adiciona_intervencao_erro: action.payload, adiciona_intervencao_erro: false }
        case ADICIONA_INTERVENCAO_SUCESSO:
            return {
                ...state,
                descricao_intervencao: '',
                valor_intervencao: '',
                data_intervencao: '',
                veiculo_intervencao: '',
                peca_intervencao: '',
                local_intervencao: '',
                star_intervencao: '',
                adiciona_intervencao_erro: '',
                cadastro_intervencao_em_andamento: false
            }
        case CADASTRO_INTERVENCAO_EM_ANDAMENTO:
            return { ...state, cadastro_intervencao_em_andamento: true }
        default:
            return state;
    }
}