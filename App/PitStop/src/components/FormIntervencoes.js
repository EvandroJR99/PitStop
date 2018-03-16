import React, { Component } from 'react';
import { Image, View, Text, TextInput, Button, StatusBar, ActivityIndicator, ListView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import CalendarioInt from './CalendarioInt';
import { Dropdown } from 'react-native-material-dropdown';
import { veiculosUsuarioFetchDropdown } from '../actions/AppActions';
import { LISTA_VEICULO_USUARIO_DROP } from '../actions/types';
import FormPeca from './FormPeca';
import { Actions } from 'react-native-router-flux';
/*
import {
	modificaPeca,
	modificaDescricaoPeca,
    cadastraPeca
} from '../actions/PecasActions';
*/

class formIntervencoes extends Component {

    /*
	_cadastraIntervencao() {

		const { peca, descricaoPeca } = this.props;

		this.props.cadastraPeca({ peca, descricaoPeca });
	}
*/
    /*
        renderBtnCadastro() {
            if(this.props.loading_cadastro) {
                return (
                    <ActivityIndicator size="large" />
                )
            }
            return (
                <Button title="Cadastrar" color="#F9A825" onPress={() => this._cadastraPeca()} />
            )
            */
    //    }



    componentWillMount() {

        this.props.veiculosUsuarioFetchDropdown();
        // this.criaFonteDeDados(this.props.veiculos)
    }
    /*
        componentWillReceiveProps(nextProps) {
           // this.criaFonteDeDados(nextProps.veiculos)
        }
    
        criaFonteDeDados(veiculos) {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    
            this.fonteDeDados = ds.cloneWithRows(veiculos)
            console.log(this.fonteDeDados)
        }
    
    */




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
                    <View style={{ flex: 3, justifyContent: 'center' }}>

                        <View>
                            <Dropdown dropdownPosition='0' label='Selecione o automóvel' data={this.props.dados} labelExtractor={({ apelido }) => apelido} valueExtractor={({ placa }) => placa} />
                        </View>
                        <TextInput
                            //	value={ /*this.props.peca*/}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Descrição'
                        //	onChangeText={texto => {}/*this.props.modificaPeca(texto)*/}
                        />
                        <TextInput
                            //	value={ /*this.props.descricaoPeca */}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Valor'
                        //	onChangeText={texto => {}/*this.props.modificaDescricaoPeca(texto)*/}
                        />

                        <CalendarioInt />

                        <Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{ /*this.props.erroCadastro*/}</Text>
                    </View>
                    <View style={{ width: 100, alignItems: 'center', justifyContent: 'center'}}>
                        {<Button title="Próximo" color="#F9A825" onPress={() => { Actions.formPeca(); }} />}
                        {/*this.renderBtnCadastro()*/}
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
            dados: state.ListaVeiculoReducer.dados
        }
    );
}

export default connect(
    mapStateToProps,
    {
        veiculosUsuarioFetchDropdown
    }
)(formIntervencoes);