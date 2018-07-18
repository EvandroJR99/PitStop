import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
import { intervencoesUsuarioVeiculoFetch } from '../actions/IntervencaoActions';

import { Actions } from 'react-native-router-flux';

class IntervencoesVeiculo extends Component {

    componentWillMount() {

        //this.props.intervencoesUsuarioVeiculoFetch();
        //this.listarAutomovel()
        const { apelido, placa,  ano, quilometragem, dataRevisao, kmRecomendada } = this.props;
        this.props.intervencoesUsuarioVeiculoFetch({ apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada });
        this.criaFonteDeDados(this.props.intervencoes)
      //  console.log('this.props.intervencoes'+this.props.intervencoes);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.intervencoes)
    }

    criaFonteDeDados(intervencoes) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.fonteDeDados = ds.cloneWithRows(intervencoes)
        console.log("fonte de dados inter", this.fonteDeDados)
    }

    listarAutomovel() {
        const { apelido, placa,  ano, quilometragem, dataRevisao, kmRecomendada } = this.props;
        this.props.intervencoesUsuarioVeiculoFetch({ apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada });
    }

    render() {
        return (

            <View style={{ flex: 1 }}>

                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => (
                        <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                            <Text style={{ fontSize: 16 }}> Data: {data.dataInter} </Text>
                            <Text style={{ fontSize: 16 }}> Descrição: {data.descricaoInter}</Text>
                            <Text style={{ fontSize: 16 }}> Local: {data.localInter}</Text>
                            <Text style={{ fontSize: 16 }}> Valor: {data.valorInter}</Text>
                            </View>
                    )}
                />

                    <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formIntervencoes2( {chave: this.props.uid, apelido: this.props.apelido, placa: this.props.placa,
                                    ano: this.props.ano, quilometragem: this.props.quilometragem, dataRevisao: this.props.dataRevisao, kmRecomendada: this.props.kmRecomendada})} />
              
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

export default connect(mapStateToProps, { intervencoesUsuarioVeiculoFetch })(IntervencoesVeiculo);