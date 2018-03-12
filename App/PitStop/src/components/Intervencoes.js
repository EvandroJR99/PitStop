import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import _ from 'lodash'
//import { LocaisFetch } from '../actions/LocaisActions';

import { Actions } from 'react-native-router-flux';

export default class Intervencoes extends Component {

    render() {
        return (

            <View style={{ flex: 1}}>


            <Text> Lista de Intervencoes </Text>

            <View style={{ flex: 3 }}>
                <ActionButton buttonColor="rgba(245, 127, 23, 1)" shadowStyle={{ elevation: 4 }} onPress={() => Actions.formIntervencoes()} />
            </View>

            </View>

        )
    }

}