import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu'; // 0.8.0
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Menupopup extends Component {
    render() {
        return (
            <MenuContext >
                <View>
                    <Menu>
                        <MenuTrigger>
                            <Icon 
                                name="dots-vertical"
                                size={25}
                                color="#000"

                            />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                            <MenuOption onSelect={() => alert(`Delete`)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </MenuOption>
                            <MenuOption
                                onSelect={() => alert(`Not called`)}
                                disabled={true}
                                text="Disabled"
                            />
                        </MenuOptions>
                    </Menu>
                </View>
            </MenuContext>
        );
    }
}
