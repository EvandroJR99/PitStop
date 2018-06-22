import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, Button, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

 export default class editarAutomovel extends Component {

    componentWillMount() {
        this._recuperaInformacoes()
    }

    _recuperaInformacoes() {
        const { apelido, placa, ano, quilometragem, dataRevisao, kmRecomendada} = this.props
    }

    state = {
        isModalVisibleExcluir: false,
    };


    render() {
        return (
             <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>

              <View style={{ flex: 2 }}>
                    <Text style={{ paddingTop:20, fontSize: 20 }}> Apelido</Text>
                    <TextInput
							value={this.props.apelido}
                            style={{ fontSize: 20, height: 45 }}
                            type= "search"
							placeholder={this.props.apelido}
							
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Placa: {this.props.placa}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Ano: {this.props.ano}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Quilometragem Atual: {this.props.quilometragem}</Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Data da Próxima Revisão: {this.props.dataRevisao} </Text>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Km para Revisão: {this.props.kmRecomendada}</Text>
             </View>
       
            
             </View>  
            
            
        )
    }
}

