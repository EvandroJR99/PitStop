import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator, ListView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import CalendarioInt from './CalendarioInt';
import { Dropdown } from 'react-native-material-dropdown';
import { veiculosUsuarioFetchDropdown} from '../actions/AppActions';
import { PecasFetchDropdown } from '../actions/PecasActions';
import { LocaisFetchDropdown } from '../actions/LocaisActions';
import { LISTA_VEICULO_USUARIO_DROP, LISTA_PECA_DROP, LISTA_LOCAIS_DROP } from '../actions/types';
import FormPeca from './FormPeca';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import { Actions } from 'react-native-router-flux';


import {
    modificaVeiculoIntervencao,
    modificaDescricaoIntervencao,
    modificaValor,
    modificaPecaIntervencao,
    modificaLocalIntervencao,
    modificaDataIntervencao,
    cadastraIntervencao
} from '../actions/IntervencaoActions';


class formIntervencoes extends Component {

    
	_cadastraIntervencao() {

        const { descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao  } = this.props;
        
		this.props.cadastraIntervencao({ descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao });
	}

    
        renderBtnCadastro() {
            if(this.props.cadastro_intervencao_em_andamento) {
                return (
                    <ActivityIndicator size="large" />
                )
            }
            return (
                <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraIntervencao()} />
            )
            
       }



    componentWillMount() {

        this.props.veiculosUsuarioFetchDropdown();        
        this.props.PecasFetchDropdown();
        this.props.LocaisFetchDropdown();
        // this.criaFonteDeDados(this.props.veiculos)
    }
    /*
        componentWillReceiveProps(nextProps) {
           // this.criaFonteDeDados(nextProps.veiculos)
        }
    
        criaFonteDeDados(veiculos) {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    
            this.fonteDeDados = ds.cloneWithRows(veiculos)
            console.log(this.fonteDeDados)
        }
    
    */



    render() {

        return (
            <View style={{ flex: 1, padding: 30 }}>

                <StatusBar
                    //hidden
                    backgroundColor='#F99D11'
                    barStyle="light-content"
                />
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#FFF' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                >
                    <View style={{ flex: 3, justifyContent: 'center' }}>

                        <View>
                           
                            <Dropdown 
                            dropdownPosition='0' label='Selecione o Automóvel' 
                            data={this.props.dados} 
                            labelExtractor={({ apelido }) => apelido} 
                            valueExtractor={({ placa }) => placa}
                            value={ this.props.veiculo_intervencao}
                            onChangeText={texto => {this.props.modificaVeiculoIntervencao(texto)}}
                             />
                            
                            </View>
                        <TextInput
                            value={ this.props.descricao_intervencao}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Descrição'
                        	onChangeText={texto => {this.props.modificaDescricaoIntervencao(texto)}}
                        />
                        <TextInput
                        	value={ this.props.valor_intervencao}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Valor'
                        	onChangeText={texto => {this.props.modificaValor(texto)}}
                        />

                        <View /*VIEW DA PECA*/ style={{ flex: 1, flexDirection: 'row',  justifyContent: 'center' }}>
                            <View style={{ flex:1, justifyContent: 'center'}} >
                                
                                <Dropdown
                                 dropdownPosition='0' 
                                 label='Selecione a Peça' 
                                 data={this.props.dadosPeca} 
                                 valueExtractor ={({ nomePeca }) => nomePeca}/* valueExtractor={({ placa }) => placa}*/
                                 value={ this.props.peca_intervencao}
                                 onChangeText={texto => {this.props.modificaPecaIntervencao(texto)}}
                                 />
                                
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="plus-circle" size={30} color="#F9A825" />   
                            </View> 
                        </View>

                         <View /*VIEW DA LOCAIS*/ style={{ flex: 1, flexDirection: 'row',  justifyContent: 'center' }}>
                            <View style={{ flex:1, justifyContent: 'center'}} >
                                <Dropdown 
                                dropdownPosition='0' 
                                label='Selecione o Local' 
                                data={this.props.dadosLocais} 
                                valueExtractor ={({ nomeLocal }) => nomeLocal}
                                value={ this.props.local_intervencao}
                                onChangeText={texto => {this.props.modificaLocalIntervencao(texto)}}
                                />
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="plus-circle" size={30} color="#F9A825" />   
                            </View> 
                        </View>

                        <CalendarioInt />

                        <Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{ /*this.props.erroCadastro*/}</Text>
                    </View>
                    <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                        {this.renderBtnCadastro()}
                    </View>
                </KeyboardAwareScrollView>

            </View>
        );
    }
}


const mapStateToProps = state => {
    console.log(state);

    return (
        {
            descricao_intervencao: state.IntervencaoReducers.descricao_intervencao, 
            valor_intervencao: state.IntervencaoReducers.valor_intervencao, 
            data_intervencao: state.IntervencaoReducers.data_intervencao, 
            veiculo_intervencao: state.IntervencaoReducers.veiculo_intervencao, 
            peca_intervencao: state.IntervencaoReducers.peca_intervencao, 
            local_intervencao: state.IntervencaoReducers.local_intervencao,
			adiciona_intervencao_erro: state.IntervencaoReducers.adiciona_intervencao_erro,
            cadastro_intervencao_em_andamento: state.IntervencaoReducers.cadastro_intervencao_em_andamento,
            
            //VEICULO
            dados: state.ListaVeiculoReducer.dados,

            //PEÇA
            dadosPeca: state.ListaPecaReducer.dadosPeca,
            
            //LOCAL
            dadosLocais: state.ListaLocaisReducer.dadosLocais
        }
    );
}

export default connect(
    mapStateToProps,
    {
        modificaVeiculoIntervencao,
        modificaDescricaoIntervencao,
        modificaValor,
        modificaPecaIntervencao,
        modificaLocalIntervencao,
        modificaDataIntervencao,
        cadastraIntervencao,

        //VEICULO
        veiculosUsuarioFetchDropdown,

        //PEÇA
		PecasFetchDropdown,

        //LOCAIS
        LocaisFetchDropdown
    }
)(formIntervencoes);