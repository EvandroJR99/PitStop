import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
import { intervencoesUsuarioFetch } from '../actions/IntervencaoActions';

import { Actions } from 'react-native-router-flux';

class Intervencoes extends Component {

    componentWillMount() {

        this.props.intervencoesUsuarioFetch();
        this.criaFonteDeDados(this.props.intervencoes)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.intervencoes)
    }

    criaFonteDeDados(intervencoes) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.fonteDeDados = ds.cloneWithRows(intervencoes)
        console.log("fonte de dados inter", this.fonteDeDados)
    }

    render() {
        return (

            <View style={{ flex: 1 }}>

                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => (
                        <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                            <Text style={{ fontSize: 18 }}>Automóvel: {data.veiculoInter}</Text>
                            <Text style={{ fontSize: 16 }}> Data: {data.dataInter} </Text>
                            <Text style={{ fontSize: 16 }}> Descrição: {data.descricaoInter}</Text>
                            <Text style={{ fontSize: 16 }}> Local: {data.localInter}</Text>
                            <Text style={{ fontSize: 16 }}> Valor: {data.valorInter}</Text>
                            </View>
                    )}
                />

                    <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formIntervencoes()} />
              
            </View>

        )
    }

}

mapStateToProps = state => {
    const intervencoes = _.map(state.ListaIntervencoesReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { intervencoes }
}

export default connect(mapStateToProps, { intervencoesUsuarioFetch })(Intervencoes);