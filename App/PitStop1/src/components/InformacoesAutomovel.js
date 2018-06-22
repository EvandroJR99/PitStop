import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
    excluirAutomovel,
} from '../actions/AppActions';

 class informacoesAutomovel extends Component {

    componentWillMount() {
        this._recuperaInformacoes()
    }

    _recuperaInformacoes() {
        const { apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada} = this.props
    }

    state = {
        isModalVisibleExcluir: false,
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

    render() {
        return (
             <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>

              <View style={{ flex: 2 }}>
                    <Text style={{ paddingTop:20, fontSize: 20 }}> {this.props.apelido}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Placa: {this.props.placa}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Ano: {this.props.ano}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Quilometragem Atual: {this.props.quilometragem}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Data da Próxima Revisão: {this.props.dataRevisao} </Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Km para Revisão: {this.props.kmRecomendada}</Text>
             </View>

        
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ justifyContent: 'center', marginRight: 20, width: 120, height: 50}}>
                                 <Button title="Excluir" color="#F9A825" onPress={this._toggleModalExcluir} />
                            </View>
                            <View style={{ justifyContent: 'center', marginRight: 20,  width: 120, height: 50 }}>                
                                <Button title="Editar" color="#F9A825" onPress={() =>Actions.editarAutomovel()} />
                            </View>
                          </View>  
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

export default connect(mapStateToProps, { excluirAutomovel })(informacoesAutomovel);