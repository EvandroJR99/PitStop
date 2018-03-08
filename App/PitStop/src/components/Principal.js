import React from 'react';
import { View, StatusBar, Text, Button, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
                    <Icon name="logout" size={25} color="#fff" />
                </View>
            </View>
        </View>
        <View style={{ flex: 1, padding: 50, flexDirection: 'column', justifyContent: 'center' }}>
            <View >
                <TouchableOpacity onPress={() => Actions.automoveis()}>
                    <View style={{
                        backgroundColor: '#F9A825', alignItems: 'center',
                        justifyContent: 'center', borderRadius: 2, height: 50, elevation: 4, marginBottom: 6
                    }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>AUTOMÓVEIS</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ paddingTop: 20 }}>
                <TouchableOpacity >
                    <View style={{
                        backgroundColor: '#F9A825', alignItems: 'center',
                        justifyContent: 'center', borderRadius: 2, height: 50, elevation: 4, marginBottom: 6
                    }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>ESTABELECIMENTOS</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 20 }}>
                <TouchableOpacity >
                    <View style={{
                        backgroundColor: '#F9A825', alignItems: 'center',
                        justifyContent: 'center', borderRadius: 2, height: 50, elevation: 4, marginBottom: 6
                    }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>INTERVENÇÕES</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default Principal;