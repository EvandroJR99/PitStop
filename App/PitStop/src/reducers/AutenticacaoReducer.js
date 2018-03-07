import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_SENHA_CONF,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO
} from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    confSenha: '',
    erroCadastro: '',
    erroLogin: ''
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
                    mensagem = 'Já existe uma conta com o endereço de e-mail digitado.'
                    break;
                case 'auth/weak-password':
                    mensagem = 'A senha digitada não é forte o suficiente.'
                    break;
                case 'auth/invalid-email':
                    mensagem = 'E-mail invalido.'
                    break;
                default:
                    mensagem = action.payload;
            }
            return { ...state, erroCadastro: mensagem }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, nome: '', senha: '', confSenha: '', data: '' }
        case LOGIN_USUARIO_ERRO:
            return { ...state, erroLogin: action.payload }
        default:
            return state;
    }
}
