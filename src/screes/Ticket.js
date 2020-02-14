import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Contrast } from '../components/Componentes';
import HTML from 'react-native-render-html';
import { View, TouchableOpacity, StyleSheet, StatusBar, WebView } from 'react-native';
import {
    Container,
    Content,
    Button,
    Icon,
    Text,
    Spinner,
  } from "native-base";
  import styles from "./styles";

const Ticket = (props) => {
    const [ ticket, setTicket ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        loadTicket();
    },[]);

    loadTicket = async () => {
        const id = props.navigation.getParam('id');

        const response = await api.get(`/Ticket/${id}`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const ticket = response.data;
        setTicket(ticket);
        setLoading(false);
    };

    if (ticket.type===1) {
        var ticketTipe = <Contrast icon='!' color='#E69B6A'>INCIDENTE</Contrast>
    } else if(ticket.type===2){
        var ticketTipe = <Contrast icon='?' color='#179FD0'>PEDIDO</Contrast>
    } else {
        var ticketTipe = <Text>nenhum</Text>
    };

    if(loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
        );
    } else {
          return(
            <Container>
                <Content style={styles.container}>
                    <View>
                        <View style={styles.cardRowBetween}>
                            <View style={styles.cardRow}>
                                <Contrast icon='ID' fontSize={24} color='#999'>{ticket.id}</Contrast>
                            </View>
                            <View style={styles.cardRow}>
                                {ticketTipe}
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.cardRow}>
                                <Text style={styles.h2}>Categoria:
                                    <Text style={styles.text}> {ticket.itilcategories_id}</Text>
                                </Text>
                                
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.cardRow}>
                                <Text style={styles.h2}>Solicitante: 
                                    <Text style={styles.text}> <Icon name="user" type="FontAwesome" style={{fontSize: 18}} /> {ticket.users_id_recipient} </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.cardRow}>
                                <Text style={styles.h2}>Atribuido para: 
                                    <Text style={styles.text}> <Icon name="user" type="FontAwesome" style={{fontSize: 18}} /> {ticket.users_id_lastupdater} </Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cardColumn}>
                            <Text style={styles.h1}>{ticket.name}</Text>
                            <View style={styles.viewContent}>
                                <HTML baseFontStyle={{ fontSize: 18, color: "#666"}} html={ticket.content} />
                            </View >
                            
                            
                            <View style={styles.card}>
                                <View style={styles.cardRowNormal}>
                                    <Text>Data de abertura: </Text><Text style={styles.contrast}>{ticket.date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View  style={styles.card}>

                        <Button block  onPress={() => {props.navigation.navigate('TicketProcess', {id: ticket.id})}}>
                            <Text>Em Processamento</Text>
                        </Button>
                    
                    </View>
                </Content>
            </Container>
        ); 
    }



}

Ticket.navigationOptions = (props) => {
    return{
        headerTitle:"Chamado "+props.navigation.getParam('id'),
        
    }
};

export default Ticket;