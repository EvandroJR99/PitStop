import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducers from './AppReducers';
import ListaVeiculoReducer from './ListaVeiculoReducer';
import LocaisReducer from './LocaisReducer';
import PecasReducer from './PecasReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducers,
    ListaVeiculoReducer,
    LocaisReducer,
    PecasReducer

});