import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import _ from 'lodash'
import { veiculosUsuarioFetch } from '../actions/AppActions';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
//import Menupopup from './Menupopup';
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu'; // 0.8.0
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



class Automoveis extends Component {

    componentWillMount() {

        this.props.veiculosUsuarioFetch();
        this.criaFonteDeDados(this.props.veiculos)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.veiculos)
    }

    criaFonteDeDados(veiculos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.fonteDeDados = ds.cloneWithRows(veiculos)
        console.log("fonte de dados", this.fonteDeDados)
    }

    renderRow(veiculos) {
        return (
            <TouchableHighlight underlayColor="rgba(0, 0, 0, 0)"
                onPress={() => Actions.informacoesAutomovel({
                    title: "Informações", chave: veiculos.uid, apelido: veiculos.apelido, placa: veiculos.placa,
                    ano: veiculos.ano, quilometragem: veiculos.quilometragem, dataRevisao: veiculos.dataRevisao, kmRecomendada: veiculos.kmRecomendada
                })}
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                    <Text style={{ fontSize: 18 }}>{veiculos.apelido}</Text>
                    <Text style={{ fontSize: 16 }}> Placa: {veiculos.placa}</Text>
                    
                    <View>
                        <Menu>
                            <MenuTrigger>
                                <Icon
                                    name="dots-vertical"
                                    size={25}
                                    color="#000"

                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                                <MenuOption onSelect={() => alert(`Delete`)}>
                                    <Text style={{ color: 'red' }}>Delete</Text>
                                </MenuOption>
                                <MenuOption
                                    onSelect={() => alert(`Not called`)}
                                    disabled={true}
                                    text="Disabled"
                                />
                            </MenuOptions>
                        </Menu>
                    </View>
               

                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MenuContext style={styles.container} >
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={this.renderRow}
                />
                 </MenuContext>






                <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formVeiculo()} />


            </View>


        )
    }
}

mapStateToProps = state => {
    const veiculos = _.map(state.ListaVeiculoReducer, (val, uid) => {


        return { ...val, uid }

    })
    return { veiculos }
}

export default connect(mapStateToProps, { veiculosUsuarioFetch })(Automoveis);

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
  