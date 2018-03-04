import React from 'react';
import { Image, View, Text, TextInput, Button, TouchableHighlight, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const logo = require('../imgs/logo-pit.png');

import { Actions } from 'react-native-router-flux';

export default props => (
    <View style={{ flex: 1, padding: 30 }}>
        <StatusBar
            //hidden
            backgroundColor='#F99D11'
            barStyle="light-content"
        />
        <KeyboardAwareScrollView
            style={{ backgroundColor: '#FFF' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 200, height: 200 }} source={logo} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TextInput style={{ fontSize: 20, height: 45 }} placeholder='E-mail' />
                <TextInput secureTextEntry style={{ fontSize: 20, height: 45 }} placeholder='Senha' />
                <Button title="Login" color='#F9A825' onPress={() => false} />
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
                <TouchableHighlight
                    onPress={() => Actions.formCadastro()}
                >
                    <Text style={{ fontSize: 14, paddingTop: 30, textAlign: 'center', fontFamily: 'Roboto' }}>Ainda não tem cadastro? Cadastre-se.</Text>
                </TouchableHighlight>
            </View>

        </KeyboardAwareScrollView>

    </View>
);
