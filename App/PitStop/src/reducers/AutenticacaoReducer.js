var today = new Date();
date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear(); //Pega data atual, podemos usar nos demais cadastros
const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    confSenha: '',
    data: date,
    erroCadastro: ''
}

export default (state = INITIAL_STATE, action) => {
    // console.log(action);
    if (action.type == 'modifica_email') {
        return { ...state, email: action.payload }
    }
    if (action.type == 'modifica_senha') {
        return { ...state, senha: action.payload }
    }
    if (action.type == 'modifica_senha_conf') {
        return { ...state, confSenha: action.payload }
    }
    if (action.type == 'modifica_nome') {
        return { ...state, nome: action.payload }
    }
    if (action.type == 'modifica_data') {
        return { ...state, data: action.payload }
    }
    if (action.type == 'cadastro_usuario_erro') {
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
            default:
                mensagem = action.payload;
        }
        return { ...state, erroCadastro: mensagem }
    }
    if (action.type == 'cadastro_usuario_sucesso') {
        return { ...state, nome: '', senha: '', confSenha: '', data: '' }
    }
    if (action.type == 'cadastro_usuario_erro_senha') {
        return { ...state, senha: '', confSenha: '' }
    }
    return state;
}