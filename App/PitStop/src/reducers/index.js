import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducers from './AppReducers';
import ListaVeiculoReducer from './ListaVeiculoReducer';
import LocaisReducer from './LocaisReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducers,
    ListaVeiculoReducer,
    LocaisReducer

});