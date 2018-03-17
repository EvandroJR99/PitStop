import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducers from './AppReducers';
import ListaVeiculoReducer from './ListaVeiculoReducer';
import LocaisReducer from './LocaisReducer';
import PecasReducer from './PecasReducer';
import ListaPecaReducer from './ListaPecaReducer';
import ListaLocaisReducer from './ListaLocaisReducer';
import IntervencaoReducers from './IntervencaoReducers';

export default combineReducers({
    AutenticacaoReducer,
    AppReducers,
    ListaVeiculoReducer,
    LocaisReducer,
    PecasReducer,
    ListaPecaReducer,
    ListaLocaisReducer,
    IntervencaoReducers

});