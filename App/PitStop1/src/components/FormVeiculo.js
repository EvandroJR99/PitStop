import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import Calendario from './Calendario';

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
            <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraVeiculo() } />
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
					scrollEnabled={false}
				>
					<View style={{ flex: 1, justifyContent: 'center' }}>

						<TextInput
							value={this.props.placa}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Placa'
							onChangeText={texto => this.props.modificaPlaca(texto)}
						/>
						<TextInput
							value={this.props.quilometragem}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Quilometragem'
							onChangeText={texto => this.props.modificaQuilometragem(texto)}
						/>
						<TextInput
							value={this.props.ano}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Ano'
							onChangeText={texto => this.props.modificaAno(texto)}
						/>
						<Text style={{ fontSize: 18, paddingTop: 10 }}>Data prevista da próxima revisão:</Text>
						<Calendario />

						<TextInput 
							value={this.props.km_recomendada}
							style={{ fontSize: 20, height: 45, paddingTop: 10 }}
							placeholder='KM recomendada'
							onChangeText={texto => this.props.modificaKmRecomendada(texto)}
						/>

						<TextInput
							value={this.props.apelido}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Apelido'
							onChangeText={texto => this.props.modificaApelido(texto)}
						/>

						<Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{this.props.cadastro_veiculo_erro}</Text>
					</View>
				</KeyboardAwareScrollView>
				<View style={{ flex: 6 }}>
					{this.renderBtnAcessar()}
				</View>
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