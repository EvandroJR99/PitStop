import React from 'react';
import { View, StatusBar, Text, Button, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';


const Principal = props => (
    <View style={{ flex: 1 }} >
        <StatusBar
            //hidden
            backgroundColor='#F99D11'
            barStyle="light-content"
        />
        <View style={{ backgroundColor: "#F9A825", elevation: 5, marginBottom: 6 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ height: 54, justifyContent: 'center' }}>
                    <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>Pit Stop</Text>
                </View>


                <View style={{ justifyContent: 'center', marginRight: 20 }}>
                    <TouchableHighlight onPress={
                        () => firebase.auth().signOut().then(() => Actions.formLogin())
                    }>
                        <Icon name="logout" size={25} color="#fff" />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <View style={{ flex: 1, padding: 50, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => Actions.automoveis()}>
                        <View style={{
                            backgroundColor: '#F9A825', alignItems: 'center',
                            justifyContent: 'center', borderRadius: 2, width: 120, height: 120, elevation: 4, marginBottom: 6
                        }}
                        >
                            <Icon name="car" size={60} color="#fff" />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, paddingTop: 10 }}>AUTOMÓVEIS</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => Actions.locais()}>
                        <View style={{
                            backgroundColor: '#F9A825', alignItems: 'center',
                            justifyContent: 'center', borderRadius: 2, width: 120, height: 120, elevation: 4, marginBottom: 6
                        }}
                        >
                            <Icon name="map-marker" size={50} color="#fff" />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, paddingTop: 15 }}>LOCAIS</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 15 }}>
                <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => Actions.formIntervencoes()}>
                        <View style={{
                            backgroundColor: '#F9A825', alignItems: 'center',
                            justifyContent: 'center', borderRadius: 2, width: 120, height: 120, elevation: 4, marginBottom: 6
                        }}
                        >
                            <Icon2 name="tools" size={40} color="#fff" />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, paddingTop: 20 }}>INTERVENÇÕES</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{
                            backgroundColor: '#F9A825', alignItems: 'center',
                            justifyContent: 'center', borderRadius: 2, width: 120, height: 120, elevation: 4, marginBottom: 6
                        }}
                        >
                            <Icon name="information-variant" size={58} color="#fff" />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>SOBRE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
);

export default Principal;