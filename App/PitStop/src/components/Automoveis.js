import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import _ from 'lodash'
import { veiculosUsuarioFetch } from '../actions/AppActions';

import { Actions } from 'react-native-router-flux';

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

    render() {
        return (
            <View style={{ flex: 1}}>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => (
                        <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                            <Text style={{ fontSize: 18 }}>{data.apelido}</Text>
                            <Text style={{ fontSize: 16 }}> Placa: {data.placa}</Text>
                        </View>
                    )}
                />
                <View style={{ flex: 3 }}>
                    <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formVeiculo()} />
                </View>
                
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