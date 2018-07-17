import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native'

import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Items extends Component {

    alerta(key) {
        Alert.alert(
            'Atenção!',
            'Tem certeza que deseja excluir essa notificação?',
            [
                { text: 'SIM', onPress: () => this.props.onRemoveItems(key) },
                { text: 'NÃO', onPress: () => console.log('') },
            ],
            { cancelable: false }
        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    style={styles.list}
                    enableEmptySections
                    dataSource={this.props.dataSource}
                    renderRow={({ key, ...value }) => {
                        const activate = (
                            <TouchableOpacity onPress={() => this.props.handleNotifications(value, key)}>
                                <Icon
                                    name="bell-off"
                                    size={25}
                                    color="#000"

                                />
                            </TouchableOpacity>
                        )
                        const desactivate = (
                            <TouchableOpacity onPress={() => this.props.handleRemoveNotifications(key)}>
                                <Icon
                                    name="bell"
                                    size={25}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        )

                        const deleteRow = (
                            <Icon
                                name="delete-forever"
                                size={25}
                                color="black"
                            />
                        )
                        return (
                            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                                <Text style={{ fontSize: 18 }} >{value.title}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{value.date}</Text>
                                    <TouchableOpacity onPress={() => this.alerta(key)}>
                                        {deleteRow}
                                    </TouchableOpacity>
                                    {value.notification ? desactivate : activate}
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        borderBottomWidth: 2,
        borderColor: "#CCC"
    },
    list: {
        marginTop: 5
    }
})