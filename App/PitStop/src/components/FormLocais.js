import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';




export default class formLocais extends Component {



	renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#F9A825" onPress={() =>{}} />
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
//							value={this.props.nome}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Nome do Local'
//							onChangeText={texto => {}}
						/>
						<TextInput
//							value={this.props.email}
							style={{ fontSize: 20, height: 45 }}
							placeholder='Especialidade '
//							onChangeText={texto => {}}
						/>
						<TextInput
//							value={this.props.senha}
							secureTextEntry
							style={{ fontSize: 20, height: 45 }}
							placeholder='Endereço'
//							onChangeText={texto => {}}
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

