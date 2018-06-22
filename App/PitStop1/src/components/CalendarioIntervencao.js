import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,  
  PanResponder
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';

import { modificaDataIntervencao } from '../actions/IntervencaoActions';

class Calendario extends Component {

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
          date={this.props.data_itervencao}
          mode="date"
          placeholder="Data de Revisão"
          format="DD-MM-YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2020"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => this.props.modificaDataIntervencao(date)}
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

const mapStateToProps = state => {

	return (
		{
			data_itervencao : state.IntervencaoReducers.data_itervencao
		}
	);
}

export default connect(
	mapStateToProps,
	{
		modificaDataIntervencao
	}
)(Calendario);