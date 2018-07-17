import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';


import {
	modificaNomeLocal,
	modificaResponsavel,
	modificaEndereco,
	cadastraLocal
} from '../actions/LocaisActions';

 class formLocais extends Component {

	_cadastraLocal() {

		const { nomeLocal, responsavel, endereco } = this.props;

		this.props.cadastraLocal({ nomeLocal, responsavel, endereco });
	}

	renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="CONFIRMAR" color="#F9A825" onPress={() => this._cadastraLocal()} />
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
					<Text style={{fontSize: 18 }}>Nome do Local:</Text>
						<TextInput
							value={this.props.nomeLocal}
							style={{ fontSize: 20, height: 45 }}
							placeholder=''
							maxLength = {45}
							onChangeText={texto => this.props.modificaNomeLocal(texto)}
						/>
						<Text style={{fontSize: 18 }}>Responsável:</Text>
						<TextInput
							value={this.props.responsavel}
							style={{ fontSize: 20, height: 45 }}
							placeholder=''
							maxLength = {50}
							onChangeText={texto => this.props.modificaResponsavel(texto)}
						/>
						<Text style={{fontSize: 18 }}>Endereço:</Text>
						<TextInput
							value={this.props.endereco}
							style={{ fontSize: 20, height: 45 }}
							placeholder=''
							maxLength = {100}
							onChangeText={texto => this.props.modificaEndereco(texto)}
						/>
						
						<Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10}}>{this.props.adiciona_local_erro}</Text>
					</View>
				</KeyboardAwareScrollView>
				<View style={{ flex: 6 }}>
					{this.renderBtnCadastro()}
				</View>

			</View>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);

	return (
		{
			nomeLocal: state.LocaisReducer.nomeLocal,
			responsavel: state.LocaisReducer.responsavel,
			endereco: state.LocaisReducer.endereco,
			adiciona_local_sucesso: state.LocaisReducer.adiciona_local_sucesso,
			adiciona_local_erro: state.LocaisReducer.adiciona_local_erro,
			loading_cadastro: state.LocaisReducer.cadastro_em_andamento_local
		}
	);
}

export default connect(
	mapStateToProps,
	{
		modificaNomeLocal,
		modificaResponsavel,
		modificaEndereco,
		cadastraLocal
	}
)(formLocais);