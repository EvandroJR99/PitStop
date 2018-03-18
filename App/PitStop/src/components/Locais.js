import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
//import { LocaisFetch } from '../actions/LocaisActions';
import { locaisFetch } from '../actions/LocaisActions';
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";


class Locais extends Component {

    componentWillMount() {

        this.props.locaisFetch();
        this.criaFonteDeDados(this.props.locais)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.locais)
    }

    criaFonteDeDados(locais) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.fonteDeDados = ds.cloneWithRows(locais)
        console.log("fonte de dados", this.fonteDeDados)
    }

    

    renderRow(locais) {
        return (
            <TouchableHighlight
                onPress={() => Actions.informacoesLocais({ title: locais.nomeLocal, nomeLocal: locais.nomeLocal, enderecoLocal: locais.endereco}) }
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                    <Text style={{ fontSize: 18 }}>{locais.nomeLocal}</Text>
                    <Text style={{ fontSize: 16 }}> Endereço: {locais.endereco}</Text>
               
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={this.renderRow}
                />

                <ActionButton activr='true' buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formLocais()} />


            </View>


        )
    }
}

mapStateToProps = state => {
    const locais = _.map(state.ListaLocaisReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { locais }
}

export default connect(mapStateToProps, { locaisFetch })(Locais);