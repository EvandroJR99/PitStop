import {
    MODIFICA_ANO,
    MODIFICA_APELIDO,
    MODIFICA_DATA_REVISAO,
    MODIFICA_PLACA,
    MODIFICA_KM_RECOMENDADA,
    MODIFICA_QUILOMETRAGEM,
    ADICIONA_VEICULO_ERRO,
    ADICIONA_VEICULO_SUCESSO,
    CADASTRO_VEICULO_EM_ANDAMENTO,
    CADASTRO_VEICULO_ERRO_CAMPOS_VAZIOS,
    CADASTRO_VEICULO_ERRO_APELIDO,
    CADASTRO_VEICULO_ERRO_PLACA,
    ATUALIZA_VEICULO_ERRO,
    ATUALIZA_VEICULO_SUCESSO,
    ATUALIZA_VEICULO_EM_ANDAMENTO,
    EXCLUI_VEICULO_ERRO,
    EXCLUI_VEICULO_SUCESSO,
    EXCLUI_VEICULO_EM_ANDAMENTO
    
} from '../actions/types';

const INITIAL_STATE = {
    placa: '',
    quilometragem: '',
    ano: '',
    data_revisao: '',
    km_recomendada: '',
    apelido: '',
    
    cadastro_veiculo_erro: '',
    cadastro_veiculo_em_andamento: false,
    exclui_veiculo_erro: '',
    exclui_veiculo_em_andamento: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_ANO:
            return { ...state, ano: action.payload }
        case MODIFICA_APELIDO:
            return { ...state, apelido: action.payload }
        case MODIFICA_DATA_REVISAO:
            return { ...state, data_revisao: action.payload }
        case MODIFICA_PLACA:
            return { ...state, placa: action.payload }
        case MODIFICA_KM_RECOMENDADA:
            return { ...state, km_recomendada: action.payload }
        case MODIFICA_QUILOMETRAGEM:
            return { ...state, quilometragem: action.payload }
        case ADICIONA_VEICULO_ERRO:
            return { ...state, cadastro_veiculo_erro: action.payload, cadastro_veiculo_em_andamento: false }
        case CADASTRO_VEICULO_ERRO_CAMPOS_VAZIOS:
            return { ...state, cadastro_veiculo_erro: 'Todos os campos são obrigatórios.', cadastro_veiculo_em_andamento: false }
        case CADASTRO_VEICULO_ERRO_APELIDO:
            return { ...state, cadastro_veiculo_erro: 'O apelido digitado é inválido, favor usar somente letras.', cadastro_veiculo_em_andamento: false }
        case CADASTRO_VEICULO_ERRO_PLACA:
            return { ...state, cadastro_veiculo_erro: 'A placa digitada é inválida.', cadastro_veiculo_em_andamento: false }
        case ADICIONA_VEICULO_SUCESSO:
            return {
                ...state,
                placa: '',
                quilometragem: '',
                ano: '',
                data_revisao: '',
                km_recomendada: '',
                apelido: '',
                cadastro_veiculo_erro: '',
                cadastro_veiculo_em_andamento: false
            }
        case CADASTRO_VEICULO_EM_ANDAMENTO:
            return { ...state, cadastro_veiculo_em_andamento: true }            //
        case ATUALIZA_VEICULO_ERRO:
            return { ...state, atualiza_veiculo_erro: action.payload, exclui_veiculo_em_andamento: false }
        case ATUALIZA_VEICULO_SUCESSO:
            return {
                ...state,
                placa: '',
                quilometragem: '',
                ano: '',
                data_revisao: '',
                km_recomendada: '',
                apelido: '',
                atualiza_veiculo_erro: '',
                atualiza_veiculo_em_andamento: false
            }
        case ATUALIZA_VEICULO_EM_ANDAMENTO:
            return { ...state, atualiza_veiculo_em_andamento: true }

            //
            case EXCLUI_VEICULO_ERRO:
            return { ...state, exclui_veiculo_erro: action.payload, exclui_veiculo_em_andamento: false }
        case EXCLUI_VEICULO_SUCESSO:
            return {
                ...state,
                placa: '',
                quilometragem: '',
                ano: '',
                data_revisao: '',
                km_recomendada: '',
                apelido: '',
                exclui_veiculo_erro: '',
                exclui_veiculo_em_andamento: false
            }
        case EXCLUI_VEICULO_EM_ANDAMENTO:
            return { ...state, exclui_veiculo_em_andamento: true }
        default:
            return state;
    }
}