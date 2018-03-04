import React from 'react';
import { Image, View, Text, TextInput, Button, StatusBar} from 'react-native';
import Calendario from './Calendario';

export default props => (
	

	<View style={{ flex: 1, padding: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
		<StatusBar 
          //hidden
          backgroundColor='#F9A825'
        />
	   <View style={{ width: 300, height: 250, paddingTop: 30}}>
		   <TextInput style={{ fontSize: 20, height: 45 }} placeholder='Nome' />
		   <TextInput style={{ fontSize: 20, height: 45 }} placeholder='E-mail' />
		   <TextInput secureTextEntry style={{ fontSize: 20, height: 45 }} placeholder='Senha' />
		   <TextInput secureTextEntry style={{ fontSize: 20, height: 45 }} placeholder='Confirmação Senha' />  
		   <Calendario /> 
	   </View>
	   <View style={{ width: 300, height: 200}}>
		   <Button title="Cadastrar" color='#FBC02D' onPress={() => false} />
	   </View>
   </View>
);
