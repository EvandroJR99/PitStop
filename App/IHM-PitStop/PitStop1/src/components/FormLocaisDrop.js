import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

import { Dropdown } from 'react-native-material-dropdown';
import { LISTA_LOCAL_DROP } from '../actions/types';

import {
	modificaNomeLocal,
	modificaResponsavel,
	modificaEndereco,
	cadastraLocal,
	LocaisFecthDropdown 
} from '../actions/LocaisActions';

 class formLocais extends Component {

	componentWillMount() {
		this.props.LocaisFecthDropdown();
	}

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
            <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraLocal()} />
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

						<View>
                            <Text>Escolha o locais</Text>
                            <Dropdown dropdownPosition='0' label='selecione a local' data={this.props.dadosLocal} valueExtractor ={({ nomeLocal }) => nomeLocal}/* valueExtractor={({ placa }) => placa}*//>
                        </View>

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
			loading_cadastro: state.LocaisReducer.cadastro_em_andamento_local,
			dadosLocal: state.ListaLocaisReducer.dadosLocal
		}
	);
}

export default connect(
	mapStateToProps,
	{
		modificaNomeLocal,
		modificaResponsavel,
		modificaEndereco,
		cadastraLocal,
		LocaisFecthDropdown 
	}
)(formLocais);