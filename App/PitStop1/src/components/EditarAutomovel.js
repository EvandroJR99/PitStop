import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, Button, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CalendarioEditarAutomovel from './CalendarioEditarAutomovel';
import firebase from 'firebase';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
	cadastraVeiculo
} from '../actions/AppActions';

 class editarAutomovel extends Component {


    componentWillMount() {
        this._recuperaInformacoes()
    }

    _recuperaInformacoes() {
        const { apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada} = this.props
        console.log("dentro do recupera informacoes editar", this.props.ano)
    }

    constructor(props) {
        super(props);
        this.state = {textApelido:this.props.apelido, textPlaca: this.props.placa, textAno: this.props.ano, 
            textQuilometragem: this.props.quilometragem, textDataRevisao: this.props.dataRevisao, textkmRecomendada: this.props.kmRecomendada };
       
        // console.log("this.props.apelido", this.props.apelido);
      }

      _cadastraVeiculo() {

		const { placa, quilometragem, ano, data_revisao, km_recomendada, apelido } = this.props;

		this.props.cadastraVeiculo({ placa, quilometragem, ano, data_revisao, km_recomendada, apelido });
    }
    
    renderBtnAcessar() {

        if (this.cadastro_veiculo_em_andamento) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Confirmar" color="#F9A825" onPress={() => this._cadastraVeiculo() } />
        )
    }


      render() {
        return (
           
             <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
              <KeyboardAwareScrollView
                    style={{ backgroundColor: '#FFF' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableAutomaticScroll={true}
                >

              <View style={{ flex: 2 }}>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Apelido:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"       
                            onChangeText={(textApelido) => this.setState({textApelido})}
                            value={this.state.textApelido}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Placa:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"
                            onChangeText={(textPlaca) => this.setState({textPlaca})}
                            value={this.state.textPlaca}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Ano:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"
                            onChangeText={(textAno) => this.setState({textAno})}
                            value={this.state.textAno}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Quilometragem Atual:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"
                            onChangeText={(textQuilometragem) => this.setState({textQuilometragem})}
                            value={this.state.textQuilometragem}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Data da Próxima Revisão:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"
                            onChangeText={(textDataRevisao) => this.setState({textDataRevisao})}
                            value={this.state.textDataRevisao}
						/>
                        <CalendarioEditarAutomovel />
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Km para Revisão:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"
                            onChangeText={(textkmRecomendada) => this.setState({textkmRecomendada})}
                            value={this.state.textkmRecomendada}
						/>
                <View style={{ flex: 6 }}>
					{this.renderBtnAcessar()}
			 </View>
             </View>
       
             </KeyboardAwareScrollView>
             
             </View>  
            
            
        )
    }
}

const mapStateToProps = state => {
	console.log(state);

	return (
		{
			placa: state.AppReducers.placa,
			quilometragem: state.AppReducers.quilometragem,
			ano: state.AppReducers.ano,
			data_revisao: state.AppReducers.data_revisao,
			km_recomendada: state.AppReducers.km_recomendada,
			apelido: state.AppReducers.apelido,
			cadastro_veiculo_erro: state.AppReducers.cadastro_veiculo_erro,
			cadastro_veiculo_em_andamento: state.AppReducers.cadastro_veiculo_em_andamento
		}
	);
}

export default connect(
	mapStateToProps,
	{
		cadastraVeiculo
	}
)(editarAutomovel);