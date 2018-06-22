import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
//import { LocaisFetch } from '../actions/LocaisActions';
import { locaisFetch } from '../actions/LocaisActions';
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";


export default class Sobre extends Component {


    render() {
        return (
            <View  style={{ padding: 20}}> 
                <Text style={{ paddingTop: 10, fontSize: 18 }}> O Pit Stop é um aplicativo para gerenciamento pessoal de automóveis.
                </Text>

                <Text style={{ paddingTop: 10, fontSize: 18 }}> Atualmente esta na versão 1.0.
                </Text>

                <Text style={{ paddingTop: 10, fontSize: 18 }}> Informações uteis:
                </Text>
                <Text style={{ paddingTop: 10, fontSize: 18 }}> Automóveis -  Contém a lista de todos os automóveis do usuário, e permite a inserção de um automóvel.
                </Text>
                <Text style={{ paddingTop: 10, fontSize: 18 }}> Locais -  Contém todos os locais disponíveis no banco de dados PitStop, e permite a inclusão de um estabelecimento.
                </Text>
                <Text style={{ paddingTop: 10, fontSize: 18 }}> Intervenções - Contém todas as alterações que foram realizadas nos automóveis do usuário, e permite a inclusão de uma nova intervenção.
                </Text>

                 <Text style={{ paddingTop: 10, fontSize: 18 }}> Desenvolvedores: Amelia Alice, Evandro Cavalcante, Mariana Xavier e Michele Ascoli
                </Text>

            </View>
        )
    }
}

