import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, Button, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';
import b64 from 'base-64';
import { soletras, validationEmail } from '../actions/validations';
import TextInputMask from 'react-native-text-input-mask';

import {
    ATUALIZA_VEICULO_ERRO,
    ATUALIZA_VEICULO_SUCESSO,
    ATUALIZA_VEICULO_EM_ANDAMENTO
} from '../actions/AppActions';

export default class editarAutomovel extends Component {

    componentWillMount() {
        this._recuperaInformacoes()
    }

    _recuperaInformacoes() {
        const { apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada } = this.props
    }

    constructor(props) {
        super(props);
        //this.state = {apelido: this.props.apelido, placa: this.props.placa, ano: this.props.ano, quilometragem: this.props.quilometragem, dataRevisao: this.props.dataRevisao, kmRecomendada: this.props.kmRecomendada};
        this.state = { atualizando_veiculo: false, atualizando_veiculo_erro: '', textoApelido: this.props.apelido, textoPlaca: this.props.placa, textoAno: this.props.ano, textoQuilometragem: this.props.quilometragem, textoDataRevisao: this.props.dataRevisao, textoKmRecomendada: this.props.kmRecomendada };
    }

    atualizaAutomovel() {
        this.setState({ atualizando_veiculo: true });
        if (this.state.textoApelido == '' || this.state.textoPlaca == '' || this.state.textoQuilometragem == '' || this.state.textoAno == '' || this.state.textoKmRecomendada == '') {
            this.setState({
                atualizando_veiculo: false,
                atualizando_veiculo_erro: "Todos os campos são obrigatórios."
            })
        } else {
            const validApelido = soletras.exec(this.state.textoApelido);
            if (validApelido) {
                if (this.state.textoPlaca.length >= 7) {
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);
                    firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`)
                        .once('value')
                        .then(snapshot => {
                            if (snapshot.val()) {
                                const ref = firebase.database().ref(`/usuario_veiculos/${emailUsuarioB64}`).child(this.props.chave);
                                ref.set({ apelido: this.state.textoApelido, placa: this.state.textoPlaca, quilometragem: this.state.textoQuilometragem, ano: this.state.textoAno, dataRevisao: this.state.textoDataRevisao, kmRecomendada: this.state.textoKmRecomendada })
                                    .then(this.setState({ atualizando_veiculo: false })
                           /* () => atualizaVeiculoSucesso(dispatch)*/)
                                    .catch(erro => atualizaVeiculoErro(erro.message, dispatch))

                                Alert.alert(
                                    'Atualizado!',
                                    'Automóvel atualizado com sucesso!',
                                    [
                                        { text: 'OK', onPress: () => Actions.principal() },
                                    ],
                                    { cancelable: false }
                                )


                            } else {
                                this.setState({
                                    atualizando_veiculo: false,
                                    atualizando_veiculo_erro: "Erro ao atualizar o automóvel."
                                })
                            }
                        });
                } else {
                    this.setState({
                        atualizando_veiculo: false,
                        atualizando_veiculo_erro: "A placa digitada é inválida."
                    })
                }
            } else {
                this.setState({
                    atualizando_veiculo: false,
                    atualizando_veiculo_erro: "O apelido digitado é inválido."
                })
            }
        }

    }

    renderBtnAtualizar() {
        if (this.state.atualizando_veiculo) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="SALVAR" color='#F9A825' onPress={() => this.atualizaAutomovel()} />
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
                        <Text style={{ paddingTop: 20, fontSize: 18 }}>Apelido:</Text>
                        <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            editable={true}
                            defaultValue={this.props.apelido}
                            onChangeText={texto => this.setState({ textoApelido: texto })}

                        />

                        <Text style={{ paddingTop: 20, fontSize: 18 }}>Ano Modelo:</Text>
						<TextInputMask
							refInput={ref => { this.input = ref }}
                            style={{ fontSize: 20, height: 45 }}
                            defaultValue={this.props.ano}
							onChangeText={(formatted)=> {this.setState({ textoAno: formatted })}}
							mask={"[0000]"}
						/>
                        
                        <Text style={{ paddingTop: 20, fontSize: 18 }}>Placa:</Text>
						<TextInput
                            style={{ fontSize: 20, height: 45 }}
                            editable = {true}
							placeholder=''
                            maxLength = {8}
                            defaultValue={this.props.placa}
                            onChangeText={texto => this.setState({ textoPlaca: texto })}
						/>

                        <Text style={{ paddingTop: 20, fontSize: 18 }}>Quilometragem Atual:</Text>
						<TextInputMask
							refInput={ref => { this.input = ref }}
                            style={{ fontSize: 20, height: 45 }}
                            defaultValue={this.props.quilometragem}
							onChangeText={(formatted) => { this.setState({ textoQuilometragem: formatted }) }}
							mask={"[000000]"}
						/>

                        <Text style={{ paddingTop: 20, fontSize: 18 }}>KM recomendada para revisão:</Text>
						<TextInputMask
							refInput={ref => { this.input = ref }}
                            style={{ fontSize: 20, height: 45 }}
                            defaultValue={this.props.kmRecomendada}
							onChangeText={(formatted) => { this.setState({ textoKmRecomendada: formatted }) }}
							mask={"[000000]"}
						/>
                        <Text style={{ paddingTop: 20, fontSize: 18 }}>Data da Próxima Revisão:</Text>
                        <View >
                            <DatePicker
                                style={{ width: 290, paddingTop: 5 }}
                                date={this.state.textoDataRevisao}
                                mode="date"
                                placeholder="Data de Revisão"
                                format="DD-MM-YYYY"
                                minDate="01-01-1900"
                                maxDate="01-01-2020"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={texto => this.setState({ textoDataRevisao: texto })}
                            />
                        </View>

                    </View>

                    <Text style={{ color: '#ff0000', fontSize: 14, paddingTop: 10 }}>{this.state.atualizando_veiculo_erro}</Text>
                    {this.renderBtnAtualizar()}
                </KeyboardAwareScrollView>
            </View>


        )
    }
}

const mapStateToProps = state => {
    console.log(state);

    return (
        {
            atualiza_veiculo_erro: state.AppReducers.atualiza_veiculo_erro,
            atualiza_veiculo_em_andamento: state.AppReducers.atualiza_veiculo_em_andamento
        }
    );
}

