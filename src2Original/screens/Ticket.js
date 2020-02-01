import React, { Component } from 'react';
import api from '../services/api';
import HTML from 'react-native-render-html';

import { Contrast , TextRed} from './Componentes';

import { View, TouchableOpacity, StyleSheet, StatusBar, WebView } from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  ListItem,
  List,
} from "native-base";

import styles from "./styles";


export default class Ticket extends Component {

    state = {
        ticket: [],
    };

    

    componentDidMount(){
        this.loadTicket();
    }

    loadTicket = async () => {
        const id = this.props.navigation.getParam('id');

        const response = await api.get(`/Ticket/${id}`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const ticket = response.data;
        this.setState({ ticket });
   
    };

    

    render(){

        const htmlContent = 
            <HTML  html={this.state.ticket.content} />
        ;

        if (this.state.ticket.type===1) {
            var ticketTipe = <Contrast icon='!' color='#E69B6A'>INCIDENTE</Contrast>
        } else if(this.state.ticket.type===2){
            var ticketTipe = <Contrast icon='?' color='#179FD0'>PEDIDO</Contrast>
        } else {
            var ticketTipe = <Text>nenhum</Text>
        };

        return(
            
            <Container>
                <Header>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>Chamado {this.state.ticket.id}</Title>
                </Body>
                <Right />
                </Header>

                <Content style={styles.container}>
                    <View>
                        <View style={styles.cardRowBetween}>
                            <View style={styles.cardRow}>
                                <Contrast icon='ID' fontSize={24} color='#999'>{this.state.ticket.id}</Contrast>
                            </View>
                            <View style={styles.cardRow}>
                                {ticketTipe}
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.cardRow}>
                                <Text style={styles.h2}>Categoria:
                                    <Text style={styles.text}> {this.state.ticket.itilcategories_id}</Text>
                                </Text>
                                
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.cardRow}>
                                <Text style={styles.h2}>Solicitante: 
                                    <Text style={styles.text}> <Icon name="user" type="FontAwesome" style={{fontSize: 18}} /> {this.state.ticket.users_id_recipient} </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.cardRow}>
                                <Text style={styles.h2}>Atribuido para: 
                                    <Text style={styles.text}> <Icon name="user" type="FontAwesome" style={{fontSize: 18}} /> {this.state.ticket.users_id_lastupdater} </Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cardColumn}>
                            <Text style={styles.h1}>{this.state.ticket.name}</Text>
                            <View style={styles.viewContent}>
                                 <HTML baseFontStyle={{ fontSize: 18, color: "#666"}} html={this.state.ticket.content} />
                            </View >
                            
                            
                            <View style={styles.card}>
                                <View style={styles.cardRowNormal}>
                                    <Text>Data de abertura: </Text><Text style={styles.contrast}>{this.state.ticket.date}</Text>
                                </View>
                            </View>
                            
                        </View>
                    
                    </View>
                    <View  style={styles.card}>

                        <Button block  onPress={() => {this.props.navigation.navigate('TicketProcess', {id: this.state.ticket.id})}}>
                            <Text>Em Processamento</Text>
                        </Button>
                    
                    </View>
                </Content>

                

            </Container>
                
            
        );
    }

}