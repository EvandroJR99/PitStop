import React from 'react';
import { Image, View, Text, TextInput, Button, TouchableHighlight, StatusBar  } from 'react-native';

const logo = require('../imgs/logo-pit.png');

import { Actions } from 'react-native-router-flux';

export default props => (
     <View style={{ flex: 1, padding: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar 
          //hidden
          backgroundColor='#F9A825'
        />
        <View style={{ width: 200, height: 200}}>
            <Image style={{width: 200, height: 200}} source={logo} />
        </View>
        <View style={{ width: 300, height: 120}}>
            <TextInput style={{ fontSize: 20, height: 45 }} placeholder='E-mail' />
            <TextInput secureTextEntry style={{ fontSize: 20, height: 45 }} placeholder='Senha' />
        </View>
        <View style={{ width: 300, height: 200}}>
            <Button title="Login" color='#FBC02D' onPress={() => false} />

            <TouchableHighlight
                onPress={() => Actions.formCadastro() }
            >
             <Text style={{ fontSize: 14, paddingTop: 30, textAlign: 'center', fontFamily: 'Roboto'}}>Ainda não tem cadastro? Cadastre-se.</Text>
            </TouchableHighlight>
        </View>
    </View>
);
