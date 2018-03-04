import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,  
  PanResponder
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class Calendario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '20:00',
      datetime: '2016-05-05 20:00',
      datetime1: '2016-05-05 20:00'
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  render() {
	return (
      <View style={styles.container}>
     <DatePicker
          style={{width: 290, paddingTop: 5}}
          date={this.state.date}
          mode="date"
          placeholder="Data de Nascimento"
          androidMode="spinner"
          format="DD-MM-YYYY"
          minDate="1980-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date});}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});