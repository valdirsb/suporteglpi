import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {StyleSheet, Image, View } from 'react-native';
import {Container,Content, Button, Text, Footer, FooterTab, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const infoCover = require("../assets/fundoFst.png");
const infoImage = require("../assets/logo-grupo-fst.png");

const Info =  (props) => {

    killSession  = async () => {
        
        await api.get('/killSession /');
        AsyncStorage.setItem("@token", '');
        props.navigation.navigate('LoginStack');
        
    };

    return(
        <Container>
                <Content>
                    <Image source={infoCover} style={styles.infoCover} />

                    <Button block  style={styles.infoButton} onPress={() => {props.navigation.navigate('Config')}}>
                        <View style={styles.infoView}>
                            <Icon name="book" type="Entypo" />
                            <Text>Instruções</Text>
                        </View>
                    </Button>
                    <Button block style={styles.infoButton} onPress={() => {props.navigation.navigate('Sobre')}}>
                        <View style={styles.infoView}>
                            <Icon name="information" type="MaterialCommunityIcons" />
                            <Text>Sobre o App</Text>
                        </View>
                    </Button>
                    <Button block style={styles.infoButton} onPress={killSession}>
                        <View style={styles.infoView}>
                            <Icon name="exit-to-app" type="MaterialCommunityIcons" />
                            <Text>Sair</Text>
                        </View>
                    </Button>

                    <Text style={styles.textVersionTitle}>Suporte FST</Text>
                    <Text style={styles.textVersion}>Versão 0.5</Text>

                </Content>
                
            </Container>
    )
}

Info.navigationOptions = (props) => {
    return{
        headerTitle: " ",
        headerTransparent:true,
    }
};

export default Info;

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
        marginBottom: 50
      },
      infoImage: {
        position: "absolute",
        left: Platform.OS === "android" ? deviceWidth / 4 : deviceWidth / 2,
        top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        width: 168,
        height: 93,
        resizeMode: "cover"
      },
      textVersion: {
        
        textAlign: "center",
        color: "red",
        fontSize: 12,
      },
      textVersionTitle: {
        fontWeight: "bold",
        marginTop: 35,
        textAlign: "center",
        color: "blue",
        fontSize: 14,
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
