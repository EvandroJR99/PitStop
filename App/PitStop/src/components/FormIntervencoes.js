import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator, ListView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import CalendarioInt from './CalendarioInt';
import { Dropdown } from 'react-native-material-dropdown';
import { veiculosUsuarioFetchDropdown } from '../actions/AppActions';
import { LISTA_VEICULO_USUARIO_DROP, LISTA_PECA_DROP, LISTA_LOCAIS_DROP } from '../actions/types';
import FormPeca from './FormPeca';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";


import {
    modificaVeiculoIntervencao,
    modificaDescricaoIntervencao,
    modificaValor,
    modificaPecaIntervencao,
    modificaLocalIntervencao,
    modificaDataIntervencao,
    cadastraIntervencao
} from '../actions/IntervencaoActions';


import {
    modificaPeca,
    modificaDescricaoPeca,
    cadastraPeca,
    PecasFetchDropdown
} from '../actions/PecasActions';

import {
    modificaNomeLocal,
    modificaResponsavel,
    modificaEndereco,
    cadastraLocal,
    LocaisFetchDropdown
} from '../actions/LocaisActions';


class formIntervencoes extends Component {
    state = {
        isModalVisiblePeca: false,
        isModalVisibleLocal: false
    };

    _toggleModalPeca = () =>
        this.setState({ isModalVisiblePeca: !this.state.isModalVisiblePeca });

    _toggleModalLocal = () =>
        this.setState({ isModalVisibleLocal: !this.state.isModalVisibleLocal });

    _cadastraIntervencao() {

        const { descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao } = this.props;

        this.props.cadastraIntervencao({ descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao });
    }
    _cadastraPeca() {

        const { peca, descricaoPeca } = this.props;

        this.props.cadastraPeca({ peca, descricaoPeca });
        this._toggleModalPeca();
    }
    _cadastraLocal() {

        const { nomeLocal, responsavel, endereco } = this.props;

        this.props.cadastraLocal({ nomeLocal, responsavel, endereco });
        this._toggleModalLocal();
    }

    renderBtnCadastro() {
        if (this.props.cadastro_intervencao_em_andamento) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraIntervencao()} />
        )

    }

    /*   renderBtnCadastroPeca() {
           if (this.props.loading_cadastro) {
                   this.setState({ isModalVisible: !this.state.isModalVisible })
           }
           return (
              
           )
       }*/




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
                                valueExtractor={({ apelido }) => apelido}
                                value={this.props.veiculo_intervencao}
                                onChangeText={texto => { this.props.modificaVeiculoIntervencao(texto) }}
                            />

                        </View>
                        <TextInput
                            value={this.props.descricao_intervencao}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Descrição'
                            onChangeText={texto => { this.props.modificaDescricaoIntervencao(texto) }}
                        />
                        <TextInput
                            value={this.props.valor_intervencao}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Valor'
                            onChangeText={texto => { this.props.modificaValor(texto) }}
                        />

                        <View /*VIEW DA PECA*/ style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }} >

                                <Dropdown
                                    dropdownPosition='0'
                                    label='Selecione a Peça'
                                    data={this.props.dadosPeca}
                                    valueExtractor={({ nomePeca }) => nomePeca}
                                    value={this.props.peca_intervencao}
                                    onChangeText={texto => { this.props.modificaPecaIntervencao(texto) }}
                                />

                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this._toggleModalPeca}>
                                    <Icon name="plus-circle" size={30} color="#F9A825" />
                                </TouchableOpacity>
                                <Modal isVisible={this.state.isModalVisiblePeca} backdropColor='white' avoidKeyboard='false' backdropOpacity='0' >
                                    <View style={{ flex: 4, justifyContent: "center" }}>
                                        <View style={{ elevation: 4, marginBottom: 6, backgroundColor: '#F5F5F5', padding: 10, justifyContent: "center", borderBottomWidth: 20, borderTopWidth: 20, borderRadius: 10, borderColor: "rgba(0, 0, 0, 0.1)" }}>
                                            <Text style={{ fontSize: 16, textAlign: 'center', paddingBottom: 10}}>Cadastro de Peça</Text>
                                            <View>
                                                <TextInput
                                                    value={this.props.peca}
                                                    style={{ fontSize: 20, height: 45 }}
                                                    placeholder='Nome da peça'
                                                    onChangeText={texto => this.props.modificaPeca(texto)}
                                                />
                                                <TextInput
                                                    value={this.props.descricaoPeca}
                                                    style={{ fontSize: 20, height: 45 }}
                                                    placeholder='Descrição peça'
                                                    onChangeText={texto => this.props.modificaDescricaoPeca(texto)}
                                                />
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Button title="Cancelar" color="#F9A825" onPress={() => this._toggleModalPeca()} />
                                                    <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraPeca()} />
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>

                            </View>
                        </View>

                        <View /*VIEW DA LOCAIS*/ style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Dropdown
                                    dropdownPosition='0'
                                    label='Selecione o Local'
                                    data={this.props.dadosLocais}
                                    valueExtractor={({ nomeLocal }) => nomeLocal}
                                    value={this.props.local_intervencao}
                                    onChangeText={texto => { this.props.modificaLocalIntervencao(texto) }}
                                />
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this._toggleModalLocal}>
                                    <Icon name="plus-circle" size={30} color="#F9A825" />
                                </TouchableOpacity><Modal isVisible={this.state.isModalVisibleLocal} backdropColor='white' avoidKeyboard='false' backdropOpacity='0' >
                                    <View style={{ flex: 4, justifyContent: "center" }}>
                                        <View style={{ elevation: 4, marginBottom: 6, backgroundColor: '#F5F5F5', padding: 10, justifyContent: "center", borderBottomWidth: 20, borderTopWidth: 20, borderRadius: 10, borderColor: "rgba(0, 0, 0, 0.1)" }}>
                                            <Text style={{ fontSize: 16, textAlign: 'center', paddingBottom: 10}}>Cadastro de Local</Text>
                                            <View>
                                                <TextInput
                                                    value={this.props.nomeLocal}
                                                    style={{ fontSize: 20, height: 45 }}
                                                    placeholder='Nome do Local'
                                                    onChangeText={texto => this.props.modificaNomeLocal(texto)}
                                                />
                                                <TextInput
                                                    value={this.props.responsavel}
                                                    style={{ fontSize: 20, height: 45 }}
                                                    placeholder='Responsavel '
                                                    onChangeText={texto => this.props.modificaResponsavel(texto)}
                                                />
                                                <TextInput
                                                    value={this.props.endereco}
                                                    style={{ fontSize: 20, height: 45 }}
                                                    placeholder='Endereço'
                                                    onChangeText={texto => this.props.modificaEndereco(texto)}
                                                />
                                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Button title="Cancelar" color="#F9A825" onPress={() => this._toggleModalLocal()} />
                                                    <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraLocal()} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>

                        <CalendarioInt />

                        <Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{ /*this.props.erroCadastro*/}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
            peca: state.PecasReducer.peca,
            descricaoPeca: state.PecasReducer.descricaoPeca,
            adiciona_peca_sucesso: state.PecasReducer.adiciona_peca_sucesso,
            adiciona_peca_erro: state.PecasReducer.adiciona_peca_erro,
            loading_cadastro: state.PecasReducer.cadastro_em_andamento,
            dadosPeca: state.ListaPecaReducer.dadosPeca,

            //LOCAL
            nomeLocal: state.LocaisReducer.nomeLocal,
            responsavel: state.LocaisReducer.responsavel,
            endereco: state.LocaisReducer.endereco,
            adiciona_local_sucesso: state.LocaisReducer.adiciona_local_sucesso,
            adiciona_local_erro: state.LocaisReducer.adiciona_local_erro,
            loading_cadastro: state.LocaisReducer.cadastro_em_andamento_local,
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
        modificaPeca,
        modificaDescricaoPeca,
        cadastraPeca,
        PecasFetchDropdown,

        //LOCAIS
        modificaNomeLocal,
        modificaResponsavel,
        modificaEndereco,
        cadastraLocal,
        LocaisFetchDropdown
    }
)(formIntervencoes);