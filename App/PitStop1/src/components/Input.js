import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    TouchableHighlight
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Input extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Modal style={styles.modalTop} isVisible={this.props.isVisible}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 16, textAlign: 'center', paddingBottom: 20 }}>Cadastro de Notificação</Text>
                        
                        <TextInput 
                            value={this.props.title}
                            placeholder="Descrição"
                            style={{fontSize: 20, height: 45}}
                            onChangeText={(title) => this.props.onChangeTitle(title)}
                        />
                        <DatePicker style={{width: 300, paddingTop: 10}}
                            date={this.props.date}
                            mode="datetime"
                            placeholder="Data"
                            format="YYYY-MM-DD HH:mm"
                            minDate="2018-01-01"
                            maxDate="2050-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => this.props.onChangeDate(date)}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <Button title="Cancelar" color="#F9A825" onPress={this.props.onCloseModal} />
                                <Button title="Cadastrar" color="#F9A825" onPress={this.props.onHandleItems} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalTop: {
        justifyContent: 'flex-start',
        marginTop: 50
    },
    modalContent: {
        backgroundColor: '#F5F5F5',
        elevation: 4,
        padding: 25,
        borderRadius: 5
    },
    input: {
        marginBottom: 5,
        paddingTop: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3
    },
    button:{
        backgroundColor: '#F9A825',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff'
    }
})