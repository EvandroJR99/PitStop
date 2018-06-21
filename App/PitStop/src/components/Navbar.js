import React, {Component} from 'react'
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TouchableHighlight
} from 'react-native'

export default class Navbar extends Component {
    render(){
        return (
            <View style={{ flex: 1 }} >
            
        

            
        </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: 10,
        flexDirection: 'row'
    },
    containerButton: {
        justifyContent: 'center',
        top: 30,
        zIndex: 1,
        left: 8
    },
    textCenter: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})