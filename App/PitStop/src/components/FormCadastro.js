import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

import {
	modificaEmail,
	modificaSenha,
	modificaNome,
	modificaConfSenha,
	modificaData,
	erroCadastro,
	cadastraUsuario
} from '../actions/AutenticacaoActions';


class formCadastro extends Component {

	_cadastraUsuario() {

		const { nome, email, senha, confSenha } = this.props;

		this.props.cadastraUsuario({ nome, email, senha, confSenha});
	}

	renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraUsuario()} />
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
							value={this.props.nome}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Nome'
							onChangeText={texto => this.props.modificaNome(texto)}
						/>
						<TextInput
							value={this.props.email}
							style={{ fontSize: 20, height: 45 }}
							placeholder='E-mail'
							onChangeText={texto => this.props.modificaEmail(texto)}
						/>
						<TextInput
							value={this.props.senha}
							secureTextEntry
							style={{ fontSize: 20, height: 45 }}
							placeholder='Senha'
							onChangeText={texto => this.props.modificaSenha(texto)}
						/>
						<TextInput secureTextEntry 
							value={this.props.confSenha}
							style={{ fontSize: 20, height: 45 }} 
							placeholder='Confirmação Senha' 
							onChangeText={texto => this.props.modificaConfSenha(texto)}
						/>
						<Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10}}>{this.props.erroCadastro}</Text>
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
			nome: state.AutenticacaoReducer.nome,
			email: state.AutenticacaoReducer.email,
			senha: state.AutenticacaoReducer.senha,
			confSenha: state.AutenticacaoReducer.confSenha,
			erroCadastro: state.AutenticacaoReducer.erroCadastro,
			loading_cadastro: state.AutenticacaoReducer.loading_cadastro
		}
	);
}

export default connect(
	mapStateToProps,
	{
		modificaEmail,
		modificaSenha,
		modificaNome,
		modificaConfSenha,
		cadastraUsuario
	}
)(formCadastro);