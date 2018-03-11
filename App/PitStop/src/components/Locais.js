import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
import { veiculosUsuarioFetch } from '../actions/AppActions';

import { Actions } from 'react-native-router-flux';




export default class Locais extends Component {

    render() {
        return (

            <View style={{ flex: 1}}>


            <Text> Lista de Locais </Text>

            <View style={{ flex: 3 }}>
                <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formLocais()} />
            </View>

            </View>

        )
    }

}