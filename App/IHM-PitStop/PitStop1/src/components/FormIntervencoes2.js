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
import StarRating from 'react-native-star-rating';
import TextInputMask from 'react-native-text-input-mask';

import {
    modificaVeiculoIntervencao,
    modificaDescricaoIntervencao,
    modificaValor,
    modificaPecaIntervencao,
    modificaLocalIntervencao,
    modificaDataIntervencao,
    modificaStarIntervencao,
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
    cadastraLocalInt,
    LocaisFetchDropdown
} from '../actions/LocaisActions';


class formIntervencoes2 extends Component {

    //ESTRELA
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            posic: 0,
            vet : [this.props.apelido],
            textApelido: this.props.apelido
            
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
        this.props.modificaStarIntervencao(rating);
    }



    //CADASTRO PECA, LOCAL E INTERVENCAO
    state = {
        isModalVisiblePeca: false,
        isModalVisibleLocal: false
    };

    _toggleModalPeca = () =>
        this.setState({ isModalVisiblePeca: !this.state.isModalVisiblePeca });

    _toggleModalLocal = () =>
        this.setState({ isModalVisibleLocal: !this.state.isModalVisibleLocal });

    _cadastraIntervencao() {

       
        const { descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao, star_intervencao } = this.props;

        this.props.cadastraIntervencao({ descricao_intervencao, valor_intervencao, data_intervencao, veiculo_intervencao, peca_intervencao, local_intervencao, star_intervencao });
    }
    _cadastraPeca() {

        const { peca, descricaoPeca } = this.props;
        if(peca == '' || descricaoPeca == ''){
            this.props.cadastraPeca({ peca, descricaoPeca });
        }else{
            this.props.cadastraPeca({ peca, descricaoPeca });
            this._toggleModalPeca();
        }
 
    }
    _cadastraLocalInt() {

        const { nomeLocal, responsavel, endereco } = this.props;
        if(nomeLocal == '' || responsavel == '' || endereco == ''){
            this.props.cadastraLocalInt({ nomeLocal, responsavel, endereco });
        }else{
            this.props.cadastraLocalInt({ nomeLocal, responsavel, endereco });
            this._toggleModalLocal();
        }
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




    componentWillMount() {

        this.props.veiculosUsuarioFetchDropdown();
        this.props.PecasFetchDropdown();
        this.props.LocaisFetchDropdown();
        this._recuperaInformacoes();
        this.buscaPosicao();
        this.props.modificaVeiculoIntervencao(this.props.apelido);
    }


    _recuperaInformacoes() {
        const { apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada} = this.props
    }

    buscaPosicao(){
/*
        this.props.dados.forEach(element => { 
            if(element==this.props.apelido){
                this.setState({
                    posic: 
                });
            }
            
        });

        var ar = this.props.dados;
        var p = ar.indexOf(this.props.apelido);
        this.setState({
            posic: p
        });*/
    }

    render() {

        let data = [{value: this.props.apelido }];

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
                    enableAutomaticScroll={true}
                >




                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Automóvel: <Text style={{ fontSize: 20 }}> {this.props.apelido}</Text></Text>

                        <Text style={{ paddingTop: 10, fontSize: 18 }}>Descrição:<Text style={{color: 'red'}}>*</Text></Text>
                        <TextInput
                            value={this.props.descricao_intervencao}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder=''
                            onChangeText={texto => { this.props.modificaDescricaoIntervencao(texto) }}
                        />
                        <Text style={{ paddingTop: 10, fontSize: 18 }}>Valor:<Text style={{color: 'red'}}>*</Text></Text>
                        <TextInputMask
							refInput={ref => { this.input = ref }}
							style={{ fontSize: 20, height: 45 }}
							onChangeText={(formatted, extracted) => {
								this.props.modificaValor(formatted)
								console.log(formatted) // +1 (123) 456-78-90
								console.log(extracted) // 1234567890
							}}
							mask={"R$[999990].[99]"}
						/>
                        <Text style={{ paddingTop: 10, fontSize: 18 }}>Selecione a peça:</Text>
                        <View /*VIEW DA PECA*/ style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Dropdown
                                    dropdownPosition='0'
                                    data={this.props.dadosPeca}
                                    valueExtractor={({ nomePeca }) => nomePeca}
                                    value={this.props.peca_intervencao}
                                    onChangeText={texto => { this.props.modificaPecaIntervencao(texto) }}
                                />

                            </View>

                        </View>
                        <Text style={{ paddingTop: 10, fontSize: 18 }}>Selecione o Local:</Text>
                        <View /*VIEW DE LOCAIS*/ style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Dropdown
                                    dropdownPosition='0'
                                    data={this.props.dadosLocais}
                                    valueExtractor={({ nomeLocal }) => nomeLocal}
                                    value={this.props.local_intervencao}
                                    onChangeText={texto => { this.props.modificaLocalIntervencao(texto) }}
                                />
                            </View>
                            
                        </View>

                        <Text style={{ paddingTop:10, fontSize: 18, height: 45 }}>Data da intervenção:<Text style={{color: 'red'}}>*</Text></Text>
                        <CalendarioInt />


                        <Text style={{ paddingTop:10, fontSize: 18, height: 45 }}>Como você avalia esse serviço ?</Text>
                        <View style={{ paddingTop:10 }}>
                            <StarRating
                                disabled={false}
                                emptyStar={'star-border'}
                                fullStar={'star'}
                                iconSet={'MaterialIcons'}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'orange'}
                                starPadding={10}
                            />
                        </View>



                        <Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{ this.props.adiciona_intervencao_erro}</Text>
                    </View>
                       {this.renderBtnCadastro()}
                   
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
            star_intervencao: state.IntervencaoReducers.star_intervencao,
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
        modificaStarIntervencao,
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
        cadastraLocalInt,
        LocaisFetchDropdown
    }
)(formIntervencoes2);