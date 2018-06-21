import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Items extends Component {
    render(){
        return (
            <View style={{flex: 1, padding: 20}}>
                <ListView 
                    style={styles.list}
                    enableEmptySections
                    dataSource={this.props.dataSource}
                    renderRow={({key, ...value}) => {
                        const deleteRow = (
                                <Icon 
                                    name="delete-forever"
                                    size={20}
                                    color="black"
                                />
                        )
                        return (
                            <View style={styles.row}>
                                <Text>{value.title}</Text>
                                <Text>{value.date}</Text>
                                <TouchableOpacity onPress={()=> this.props.onRemoveItems(key)}>
                                    {deleteRow}
                                </TouchableOpacity>
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
        borderBottomWidth: 1, 
        borderColor: "#CCC"
    },
    list: {
        marginTop: 5
    }
})