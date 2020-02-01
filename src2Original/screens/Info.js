import React, { Component } from 'react';
import {StyleSheet, Image, View } from 'react-native';
import api from '../services/api';
import {Container,Content, Button, Text, Footer, FooterTab, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const infoCover = require("../assets/fundoFst.png");
const infoImage = require("../assets/logo-grupo-fst.png");

export default class Info extends Component {

    killSession  = async () => {
        
        await api.get('/killSession /');
        AsyncStorage.setItem("@token", '');
        this.props.navigation.navigate('Auth');
        
    };

    render() {
        return (
            <Container>
                <Content>
                    <Image source={infoCover} style={styles.infoCover} />
                    <Image square style={styles.infoImage} source={infoImage} />  
                    
                    <Button block  style={styles.infoButton}>
                        <View style={styles.infoView}>
                            <Icon name="book" type="Entypo" />
                            <Text>Instruções</Text>
                        </View>
                    </Button>
                    <Button block style={styles.infoButton}>
                        <View style={styles.infoView}>
                            <Icon name="information" type="MaterialCommunityIcons" />
                            <Text>Sobre o App</Text>
                        </View>
                    </Button>
                    <Button block style={styles.infoButton} onPress={this.killSession}>
                        <View style={styles.infoView}>
                            <Icon name="exit-to-app" type="MaterialCommunityIcons" />
                            <Text>Sair</Text>
                        </View>
                    </Button>

                </Content>

                <Footer>
                    <FooterTab>
                        <Button vertical active onPress={() => {this.props.navigation.navigate('Info')}}>
                            <Icon name="info" type="Feather" />
                            <Text>Info</Text>
                        </Button>
                        <Button vertical onPress={() => {this.props.navigation.navigate('Home')}} >
                            <Icon active name="list" type="Feather" />
                            <Text>Chamados</Text>
                        </Button>
                        <Button vertical onPress={() => {this.props.navigation.navigate('NewTicket')}}>
                            <Icon name="file-plus" type="Feather" />
                            <Text>Abrir Chamado</Text>
                        </Button>
                    </FooterTab>
                </Footer>
                
            </Container>
        )
    }
}



const React1 = require("react-native");
const { Platform, Dimensions } = React1 ;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    infoCover: {
        alignSelf: "stretch",
        height: deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
      },
      infoImage: {
        position: "absolute",
        left: Platform.OS === "android" ? deviceWidth / 4 : deviceWidth / 2,
        top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        width: 168,
        height: 93,
        resizeMode: "cover"
      },
      infoButton: {
          marginVertical: 10,
          marginHorizontal: 20,
          backgroundColor: "#184782",

      },
      infoView: {
          flexDirection: 'row'
      }
})
