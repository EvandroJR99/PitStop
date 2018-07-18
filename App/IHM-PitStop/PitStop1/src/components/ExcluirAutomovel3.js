import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, Button, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
    excluirAutomovel,
} from '../actions/AppActions';

class ExcluirAutomovel3 extends Component {
    componentWillMount() {
        this._recuperaInformacoes()
        console.log(this.props.apelido);
        console.log("UID",this.props.chave);
    }



    _recuperaInformacoes() {
        const { apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada} = this.props
    }

    state = {
        isModalVisibleExcluir: true,
    };


    _toggleModalExcluir = () =>
        this.setState({ isModalVisibleExcluir: !this.state.isModalVisibleExcluir });

        //

      
    _excluirAutomovel() {

        if (this.exclui_veiculo_em_andamento) {
            return (
                <ActivityIndicator size="large" />
            )
        }

        const { apelido, placa,  ano, quilometragem, dataRevisao, kmRecomendada } = this.props;

        this.props.excluirAutomovel({ apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada });
        this._toggleModalExcluir();
    }  
/*
    constructor(props){
        super(props);
        this.state = {apelido: this.props.apelido, placa: this.props.placa, ano: this.props.ano, quilometragem: this.props.quilometragem, dataRevisao: this.props.dataRevisao, kmRecomendada: this.props.dataRevisao};
    }
*/

    render() {
        return (
             <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Modal isVisible={this.state.isModalVisibleExcluir} backdropColor='white' avoidKeyboard='false' backdropOpacity='0' >
                                    <View style={{ flex: 4, justifyContent: "center" }}>
                                        <View style={{ elevation: 4, marginBottom: 6, backgroundColor: '#F5F5F5', padding: 10, justifyContent: "center", borderBottomWidth: 20, borderTopWidth: 20, borderRadius: 10, borderColor: "rgba(0, 0, 0, 0.1)" }}>
                                            <Text style={{ fontSize: 16, textAlign: 'center', paddingBottom: 10 }}>Exclusão de Automóvel</Text>
                                            <Text>Você realmente deseja excluir esse veículo?</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ justifyContent: 'center', marginRight: 20, width: 100, height: 45}}>
                                                    <Button title="Sim" color="#F9A825" onPress={() => this._excluirAutomovel()} />
                                                </View>
                                                <View style={{ justifyContent: 'center', marginRight: 20, width: 100, height: 45}}>
                                                    <Button title="Não" color="#F9A825" onPress={() => this._toggleModalExcluir()} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                        </View>

         
            
             </View>  
            
            
        )
    }
}

mapStateToProps = state => {
    return (
        {
            veiculo: state.AppReducers.veiculo,
            exclui_veiculo_sucesso: state.AppReducers.exclui_veiculo_sucesso,
            exclui_veiculo_erro: state.AppReducers.exclui_veiculo_erro,
            exclui_veiculo_em_andamento: state.AppReducers.exclui_veiculo_em_andamento
        }
    );
}

export default connect(mapStateToProps, { excluirAutomovel })(ExcluirAutomovel3); 