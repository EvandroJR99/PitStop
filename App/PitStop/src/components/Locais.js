import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
//import { LocaisFetch } from '../actions/LocaisActions';
import { locaisFetch  } from '../actions/LocaisActions';
import { Actions } from 'react-native-router-flux';


class Locais extends Component {

    componentWillMount() {
        
        this.props.locaisFetch();
        this.criaFonteDeDados(this.props.locais)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.locais)
    }

    criaFonteDeDados(locais) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2, r3) => r1 !== r2 !== r3})

        this.fonteDeDados = ds.cloneWithRows(locais)
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
                            <Text style={{ fontSize: 18 }}>{data.nomeLocal}</Text>
                            <Text style={{ fontSize: 16 }}> Endereço: {data.endereco}</Text>
                        </View>
                    )}
                />
                <View style={{ flex: 3 }}>
                    <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formLocais()} />
                </View>
                
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