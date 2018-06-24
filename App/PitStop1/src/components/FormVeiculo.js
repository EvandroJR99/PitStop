import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import Calendario from './Calendario';
import TextInputMask from 'react-native-text-input-mask';


import {
	modificaPlaca,
	modificaQuilometragem,
	modificaAno,
	modificaDataRevisao,
	modificaKmRecomendada,
	modificaApelido,
	cadastraVeiculo
} from '../actions/AppActions';

class formVeiculo extends Component {

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
			<Button title="CONFIRMAR" color="#F9A825" onPress={() => this._cadastraVeiculo()} />
		)
	}


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
					scrollEnabled={true}
				>
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Text style={{ paddingTop: 20, fontSize: 18 }}>Apelido:</Text>
						<TextInput
							value={this.props.apelido}
							style={{ fontSize: 20, height: 45 }}
							placeholder=''
							maxLength = {30}
							onChangeText={texto => this.props.modificaApelido(texto)}
						/>

						<Text style={{ paddingTop: 20, fontSize: 18 }}>Ano Modelo:</Text>
						<TextInputMask
							refInput={ref => { this.input = ref }}
							style={{ fontSize: 20, height: 45 }}
							onChangeText={(formatted, extracted) => {
								this.props.modificaAno(formatted)
								console.log(formatted) // +1 (123) 456-78-90
								console.log(extracted) // 1234567890
							}}
							mask={"[0000]"}
						/>

						<Text style={{ paddingTop: 20, fontSize: 18 }}>Placa:</Text>
						<TextInput
							value={this.props.placa}
							style={{ fontSize: 20, height: 45 }}
							placeholder=''
							maxLength = {8}
							onChangeText={texto => this.props.modificaPlaca(texto)}
						/>

						<Text style={{ paddingTop: 20, fontSize: 18 }}>Quilometragem:</Text>
						<TextInputMask
							refInput={ref => { this.input = ref }}
							style={{ fontSize: 20, height: 45 }}
							onChangeText={(formatted, extracted) => {
								this.props.modificaQuilometragem(formatted)
							}}
							mask={"[000000]"}
						/>
		
						<Text style={{ paddingTop: 20, fontSize: 18 }}>KM recomendada:</Text>
						<TextInputMask
							refInput={ref => { this.input = ref }}
							style={{ fontSize: 20, height: 45 }}
							onChangeText={(formatted, extracted) => {
								this.props.modificaKmRecomendada(formatted)
							}}
							mask={"[000000]"}
						/>

						<Text style={{ fontSize: 18, paddingTop: 10 }}>Data prevista da próxima revisão:</Text>
						<Calendario />

						<Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{this.props.cadastro_veiculo_erro}</Text>
						<View style={{ flex: 6 }}>
							{this.renderBtnAcessar()}
						</View>
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
		modificaPlaca,
		modificaQuilometragem,
		modificaAno,
		modificaDataRevisao,
		modificaKmRecomendada,
		modificaApelido,
		cadastraVeiculo
	}
)(formVeiculo);