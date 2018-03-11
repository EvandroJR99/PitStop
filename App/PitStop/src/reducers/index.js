import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducers from './AppReducers';
import ListaVeiculoReducer from './ListaVeiculoReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducers,
    ListaVeiculoReducer

});