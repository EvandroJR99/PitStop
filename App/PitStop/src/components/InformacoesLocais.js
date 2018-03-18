import React, { Component } from 'react';
import { View, Text, Alert, ListView } from 'react-native';
import firebase from 'firebase';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";

export default class InformacoesLocais extends Component {

    componentWillMount() {
        this._recuperaInformacoes()
    }

    componentWillReceiveProps(nextProps) {
        this.updateState();
    }

    updateState() {
        this.setState({ starCount: 0 })

    }

    _recuperaInformacoes() {
        const { nomeLocal, enderecoLocal } = this.props


        var numIntervencoes = 0;
        var somaStar = 0;

        firebase.database().ref(`/intervencoes`)
            .on("value", (ratingSnapshot) => {
                ratingSnapshot.forEach((child) => {

                    if (child.val().localInter == nomeLocal) {

                        var valorStar = child.val().starInter;
                        numIntervencoes++;
                        somaStar += valorStar;
                        console.log("somastar:", somaStar);
                        console.log("numIntervencoes", numIntervencoes);

                    }
                    var media = somaStar / numIntervencoes;
                    this.setState({ starCount: media })
                })


            });

        media = 0;
        numIntervencoes = 0;
        somaStar = 0;
    }

    //ESTRELA
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0
        };
    }



    //<Text>Endereco: {this.endereco}</Text>

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                <Text style={{ paddingTop:20, fontSize: 18 }} >Nome Local: {this.props.nomeLocal}</Text>
                <Text style={{ paddingTop:20, fontSize: 18 }}>Endereco: {this.props.enderecoLocal}</Text>
                <Text style={{ paddingTop:20, fontSize: 18 }}>Avalição dos usuários:</Text>
                <View  style={{ paddingTop: 10 }}>
                    <StarRating
                        disabled={false}
                        emptyStar={'star-border'}
                        fullStar={'star'}
                        iconSet={'MaterialIcons'}
                        maxStars={5}
                        rating={this.state.starCount}
                        starSize={30}
                        fullStarColor={'orange'}
                        starPadding={10}
                        disabled={true}
                    />
                </View>
            </View>
        )
    }
}