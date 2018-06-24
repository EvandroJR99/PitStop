import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_SENHA_CONF,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    CADASTRO_USUARIO_ERRO_SENHA,
    CADASTRO_USUARIO_ERRO_SENHA_TAMANHO,
    CADASTRO_USUARIO_ERRO_CAMPOS_VAZIOS,
    CADASTRO_USUARIO_ERRO_EMAIL,
    CADASTRO_USUARIO_ERRO_NOME,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_USUARIO_ERRO_CAMPOS_VAZIOS,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    confSenha: '',
    erroCadastro: '',
    erroLogin: '',
    loading_login: false,
    loading_cadastro: false
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_SENHA_CONF:
            return { ...state, confSenha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_ERRO:
            let mensagem = '';
            switch (action.payload) {
                case 'auth/account-exists-with-different-credential':
                    mensagem = 'O endereço de e-mail digitado já está cadastrado.'
                    break;
                case 'auth/email-already-in-use':
                    mensagem = 'Já existe uma conta com o endereço de e-mail digitado.'
                    break;
                case 'auth/weak-password':
                    mensagem = 'A senha digitada não é forte o suficiente.'
                    break;
                case 'auth/invalid-email':
                    mensagem = 'O email digitado é inválido.'
                    break;
                default:
                    mensagem = action.payload;
            }
            return { ...state, erroCadastro: mensagem, loading_cadastro: false }
        case CADASTRO_USUARIO_ERRO_SENHA:
            return { ...state, erroCadastro: 'As senhas digitadas não são iguais.', loading_cadastro: false }
        case CADASTRO_USUARIO_ERRO_SENHA_TAMANHO:
            return { ...state, erroCadastro: 'A senha precisa ter no mínimo 8 caracteres e no máximo 15 carateres.', loading_cadastro: false }
        case CADASTRO_USUARIO_ERRO_CAMPOS_VAZIOS:
            return { ...state, erroCadastro: 'Todos os campos são obrigatórios.', loading_cadastro: false }
        case CADASTRO_USUARIO_ERRO_EMAIL:
            return { ...state, erroCadastro: 'O email digitado é inválido.', loading_cadastro: false }
        case CADASTRO_USUARIO_ERRO_NOME:
            return { ...state, erroCadastro: 'O nome digitado é inválido, favor usar somente letras.', loading_cadastro: false }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, nome: '', senha: '', confSenha: '', erroCadastro: '', loading_cadastro: false }
        case LOGIN_USUARIO_ERRO:
            let mensagem2 = '';
            switch (action.payload) {
                case 'auth/network-request-failed':
                    mensagem2 = 'Erro de rede (tempo limite, conexão interrompida ou host inacessível).'
                    break;
                case 'auth/invalid-email':
                    mensagem2 = 'O email digitado é inválido.'
                    break;
                case 'auth/wrong-password':
                    mensagem2 = 'A senha digitada é inválida.'
                    break;
                case 'auth/user-not-found':
                    mensagem2 = 'Não há registro de usuário existente correspondente ao email fornecido.'
                    break;
                default:
                    mensagem2 = action.payload;
            }
            return { ...state, erroLogin: mensagem2, loading_login: false }
        case LOGIN_USUARIO_ERRO_CAMPOS_VAZIOS:
            return { ...state, erroLogin: 'Todos os campos são obrigatórios.', loading_login: false }
        case LOGIN_USUARIO_SUCESSO:
            return { ...state, ...INITIAL_STATE}
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loading_login: true }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, loading_cadastro: true }
        default:
            return state;
    }
}
