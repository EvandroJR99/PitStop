import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';

export default class EditaAutomovel extends Component {

    componentWillMount() {
        this._recuperaInformacoes()
    }

    componentWillReceiveProps(nextProps) {
        this.updateState();
    }

    updateState() {
        this.setState({ ano: "" })

    }

    _recuperaInformacoes() {
        const { apelido, placa} = this.props
        //, ano, quilometragem, dataRevisao,  KmRecomendada

        var anoRecuperado;


        firebase.database().ref(`/veiculos`)
            .on("value", (ratingSnapshot) => {
                ratingSnapshot.forEach((child) => {

                    if (child.val().placa == placa) {

                        anoRecuperado = child.val().ano;
                        console.log("anorecuperado", anoRecuperado);
                    }
                    var ano2 = anoRecuperado;
                    this.setState({ano: ano2})
                })


            });

        anoRecuperado = "deuerroANOREC";
    }

    constructor(props) {
        super(props);
        this.state = {
            ano: ""
        };
    }
    render() {
        return (
             <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                <Text style={{ paddingTop:20, fontSize: 18 }}> {this.props.apelido}</Text>
                <Text style={{ paddingTop:20, fontSize: 18 }}>Placa: {this.props.placa}</Text>
                <Text style={{ paddingTop:20, fontSize: 18 }}>Ano: {this.state.anoRecuperado}</Text>
             
            </View>    
        )
    }
}