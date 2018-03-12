import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

import { Dropdown } from 'react-native-material-dropdown';
import { LISTA_PECA_DROP } from '../actions/types';

import {
	modificaPeca,
	modificaDescricaoPeca,
	cadastraPeca,
	PecasFetchDropdown
} from '../actions/PecasActions';


class formPeca extends Component {

	componentWillMount() {

        this.props.PecasFetchDropdown();
       // this.criaFonteDeDados(this.props.veiculos)
    }

	_cadastraPeca() {

		const { peca, descricaoPeca } = this.props;

		this.props.cadastraPeca({ peca, descricaoPeca });
	}

	renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraPeca()} />
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
                            <Text>Escolha a peça</Text>
                            <Dropdown dropdownPosition='0' label='selecione a peça' data={this.props.dadosPeca} valueExtractor ={({ nomePeca }) => nomePeca}/* valueExtractor={({ placa }) => placa}*//>
                        </View>
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
			peca: state.PecasReducer.peca,
			descricaoPeca: state.PecasReducer.descricaoPeca,			
			adiciona_peca_sucesso: state.PecasReducer.adiciona_peca_sucesso,
			adiciona_peca_erro: state.PecasReducer.adiciona_peca_erro,
			loading_cadastro: state.PecasReducer.cadastro_em_andamento,
			dadosPeca: state.ListaPecaReducer.dadosPeca
		}
	);
}

export default connect(
	mapStateToProps,
	{
		modificaPeca,
		modificaDescricaoPeca,
		cadastraPeca,
		PecasFetchDropdown
	}
)(formPeca);