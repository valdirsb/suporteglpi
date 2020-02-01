import React, { Component } from 'react';
import api from '../services/api';
import { Contrast , TextRed} from './Componentes';

import { View, FlatList, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage } from 'react-native';

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
  Footer,
  FooterTab,
} from "native-base";

export default class HomeFilter extends Component {

    state = {
        tickets: [],
        filter: {
            user: "",
            status: {
                novo: true, 
                process: true, 
                pendente :true, 
                resolvido: false, 
                fechado: false
            }
        },
        filterString:"tipo.type===1",
    };

    componentDidMount(){
        this.loadTickets();
    }

    loadTickets = async () => {
        const response = await api.get('/Ticket/',{
            params: {
                expand_dropdowns: "true",
                range: "0-50"
            }
        });
        const tickets = response.data;
        this.setState({ tickets });
   
    };

    filterApplicate = (tipo) => {
        tipo.type===1
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity style={styles.productButton} onPress={() => {this.props.navigation.navigate('Ticket', {id: item.id})}}>
                <View style={styles.ticketHeader}>
                    <View style={styles.ticketLeft}>
                        <Text style={styles.ticketHeaderText}>{item.entities_id}</Text>
                    </View>
                    <View style={styles.ticketRight}>
                        {/* <Text style={styles.ticketHeaderText}>Status: Processando</Text> */}
                    </View>
                </View>
                <View style={styles.ticketBody}>
                    <Text style={styles.ticketTitle}>{item.name}</Text>
                </View>
                <View style={styles.ticketFoot}>
                    
                    {(() => {
                                switch (item.type) {
                                case 1:   return <Contrast icon='!' color='#E69B6A'>Incidente</Contrast>;
                                case 2: return <Contrast icon='?' color='#179FD0'>PEDIDO</Contrast>;
                                default:      return "Nenhum";
                                }
                    })()}

                    <View style={styles.ticketRight}>
                        <View style={styles.ticketDate}>
                            <Text style={styles.ticketFootDateText}>{item.date}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </TouchableOpacity>
        </View>
    )

    render(){

        const filterN = this.props.navigation.getParam('novo');
        const filterP = this.props.navigation.getParam('process'); 
        const filterPen = this.props.navigation.getParam('pendente'); 
        const filterR = this.props.navigation.getParam('resolvido'); 
        const filterF = this.props.navigation.getParam('fechado');    


        return(
            <Container>
                <Header style={styles.header}>
                    
                    <Body>
                        <Title>Chamados</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Text style={{color:"#E0FFFF"}}>Filtros </Text>
                            <Icon  style={{color:"#E0FFFF"}} name="filter" type="MaterialCommunityIcons" />
                        </Button>
                       

                    </Right>
                </Header>
                
                <View style={styles.container}>
                    <Text>{filterN.toString()}</Text>
                    <Text>{filterP.toString()}</Text>
                    <Text>{filterPen.toString()}</Text>
                    <Text>{filterR.toString()}</Text>
                    <Text>{filterF.toString()}</Text>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.tickets.filter((item)=>{
                            return ((filterN)?item.status===1:"")||
                                    ((filterP)?item.status===2:"")||
                                    ((filterPen)?item.status===4:"")||
                                    ((filterR)?item.status===5:"")||
                                    ((filterF)?item.status===6:"")
                        })}
                        keyExtractor={item => String(item.id) }
                        renderItem={this.renderItem}
                    />
                </View>

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => {this.props.navigation.navigate('Info')}}>
                            <Icon name="info" type="Feather" />
                            <Text>Info</Text>
                        </Button>
                        <Button vertical active>
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
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 10,
    },

    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
    },

    ticketTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },

    ticketHeaderText: {
        
        fontSize: 12,
        color: "#999",
    },

    ticketHeader: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    ticketLeft: {
        flex: 1,
        textAlign: 'left',
    },

    ticketRight: {
        flex: 1,
        alignItems: 'flex-end',
    },

    ticketFoot: {
        flex:1,
        flexDirection: 'row',
    },

    ticketDate: {
        width: 110,
        padding: 4,
        backgroundColor: "#666",
        borderRadius: 5,
        borderColor: "#184782",
        marginTop: 10,
    },

    ticketTipo: {
        flexDirection: 'row',
        width: 120,
        padding: 4,
        backgroundColor: "#F58634",
        borderRadius: 5,
        borderColor: "#184782",
        marginTop: 10,
    },

    ticketIcons: {
        width: 20,
        textAlign: 'center',
        color: '#F58634',
        borderRadius: 20,
        backgroundColor: "#fff",
        fontSize: 16,
    },

    ticketFootTypeText:{
        marginLeft: 10,
        fontSize: 13,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: "center",
    },

    ticketFootDateText:{
        marginLeft: 10,
        fontSize: 10,
        color: "#fff",
        textAlign: "center",
    },

    productButtonText: {
        fontSize: 16,
        color: "#184782",
        fontWeight: "bold"
    },

    header: {
        backgroundColor: "#184782",
    },
    tab: {
        backgroundColor: "rgb(78,122,179)",
    },
    tabText: {
        textAlign: "center",
        color: "#E0FFFF",
    },
    tabTextActive: {
        textAlign: "center",
        color: "#fff",
    }

});

StatusBar.setBackgroundColor('#113461');
StatusBar.setBarStyle("light-content");