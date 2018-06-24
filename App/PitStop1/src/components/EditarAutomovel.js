import React, { Component } from 'react';
import { View, Text, Alert, ListView, TouchableHighlight, Button, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CalendarioEditarAutomovel from './CalendarioEditarAutomovel';
import firebase from 'firebase';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {	/*
    modificaPlaca,
	modificaQuilometragem,
	modificaAno,
	modificaDataRevisao,
	modificaKmRecomendada,*/
	modificaApelido2,
	atualizaAutomovel
} from '../actions/AppActions';

 class editarAutomovel extends Component {
    
  
      _atualizaAutomovel() {
        const { apelido2, placa,  ano, quilometragem, dataRevisao, kmRecomendada } = this.props;

        this.props.atualizaAutomovel({ apelido2, placa, ano, quilometragem, dataRevisao, kmRecomendada });

        console.log("dentro do atualiza ", this.props.apelido);
    } 
    
    renderBtnSalvar() {

        if (this.props.atualiza_veiculo_em_andamento) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Salvar" color='#F9A825' onPress={() => this._atualizaAutomovel()} />
        )
    }

   constructor(props) {
        super(props);
        this.state = { textApelido: this.props.apelido, textPlaca: this.props.placa, textAno: this.props.ano, textDataRevisao: this.props.dataRevisao, textQuilometragem: this.props.quilometragem, textkmRecomendada: this.props.kmRecomendada };
        console.log(this.props.apelido);
   
    }
      render() {
    //   console.log(props);
        return (
           
             <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
              <KeyboardAwareScrollView
                    style={{ backgroundColor: '#FFF' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableAutomaticScroll={true}
                >

              <View style={{ flex: 2 }}>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Apelido:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}     
                            editable = {true}
                            placeholder={this.props.apelido}
                            value={this.props.apelido2}
                            onChangeText={texto => this.props.modificaApelido2(texto)}                            
                            
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Placa:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            onChangeText={(textPlaca) => this.setState({textPlaca})}
                            value={this.state.textPlaca}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Ano:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            onChangeText={(textAno) => this.setState({textAno})}
                            value={this.state.textAno}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Quilometragem Atual:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            onChangeText={(textQuilometragem) => this.setState({textQuilometragem})}
                            value={this.state.textQuilometragem}
						/>
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Data da Próxima Revisão:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            onChangeText={(textDataRevisao) => this.setState({textDataRevisao})}
                            value={this.state.textDataRevisao}
						/>
                        <CalendarioEditarAutomovel />
                    <Text style={{ paddingTop:20, fontSize: 18 }}>Km para Revisão:</Text>
                    <TextInput
                            style={{ fontSize: 18, height: 45 }}
                            type= "search"
                            onChangeText={(textkmRecomendada) => this.setState({textkmRecomendada})}
                            value={this.state.textkmRecomendada}
						/>

             </View>
       
             </KeyboardAwareScrollView>
             {this.renderBtnSalvar()}
                                                
             
             </View>  
            
            
        )
    }
}
/*
<View style={{ flex: 6 }}>
{this.renderBtnAcessar()}
</View>
*/
mapStateToProps = state => {
    console.log("console.log state", state);
    return (
        {
        //    veiculo: state.AppReducers.veiculo,
         /*   placa: state.AppReducers.placa,
			quilometragem: state.AppReducers.quilometragem,
			ano: state.AppReducers.ano,
			data_revisao: state.AppReducers.data_revisao,
			km_recomendada: state.AppReducers.km_recomendada,*/ 
          apelido2: state.AppReducers.apelido2, //se descomentar essa ele nao vai carregar o apelido
           atualiza_veiculo_sucesso: state.AppReducers.atualiza_veiculo_sucesso,
            atualiza_veiculo_erro: state.AppReducers.atualiza_veiculo_erro,
            atualiza_veiculo_em_andamento: state.AppReducers.atualiza_veiculo_em_andamento
        }
    );
}

export default connect(mapStateToProps, { 
        /*modificaPlaca,
		modificaQuilometragem,
		modificaAno,
		modificaDataRevisao,
		modificaKmRecomendada,*/
        modificaApelido2,
        atualizaAutomovel })
(editarAutomovel); 