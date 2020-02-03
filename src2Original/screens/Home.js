import React, { Component } from 'react';
import api from '../services/api';
import { Contrast , TextRed} from './Componentes';
import moment from 'moment';

import { View, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Header,
  Title,
  Spinner,
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

export default class Home extends Component {

    state = {
        entitys: [],
        tickets: [],
        loading:true,

        filterNovo: false, 
        filterProcess: true, 
        filterPendente :true, 
        filterResolvido: false, 
        filterFechado: false,
        
        filterString:"tipo.type===1",
    };

    componentDidMount(){
        this.loadTickets();
    }


    loadRefresh = async () => {
        this.setState({loading: true});
        this.loadTickets();
    }


    loadTickets = async () => {

        try {
            const response = await api.get('/Ticket/',{
                params: {
                    expand_dropdowns: "true",
                    order: "DESC",
                    range: "0-100"
                }
            });
            const tickets = response.data;
            this.setState({ 
                tickets,
                loading: false
            
            });
            } catch (err) {
                AsyncStorage.setItem("@token", '');
                this.props.navigation.navigate('Auth');
          }

    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity style={styles.productButton} onPress={() => {this.props.navigation.navigate('Ticket', {id: item.id})}}>
                <View style={styles.ticketHeader}>
                    <View style={styles.ticketLeft}>
                        <Text style={styles.ticketHeaderText}>{item.entities_id}</Text>
                    </View>
                    <View style={styles.ticketRight}>
                        <View style={styles.ticketDate}>
                            <Text style={styles.ticketFootDateText}>{moment(item.date).format('DD/MM/YY - HH:mm:ss')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.ticketBody}>
                    <Text style={styles.ticketTitle}>{item.name}</Text>
                </View>
                <View style={styles.ticketFoot}>
                    
                    {(() => {
                                switch (item.type) {
                                case 1:   return <Contrast icon='!' color='#E69B6A'>INCIDENTE</Contrast>;
                                case 2: return <Contrast icon='?' color='#179FD0'>PEDIDO</Contrast>;
                                default:      return <Text>Nenhum</Text>;
                                }
                    })()}

                    <View style={styles.ticketRight}>
                        <Contrast icon='ID' fontSize={18} color='#999'>{item.id}</Contrast>
                    </View>
                    
                </View>
                
            </TouchableOpacity>
        </View>
    )

    render(){
    

    if(this.state.loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
        );
    } else {

        const filterNovo = this.props.navigation.getParam('novo', true);
        const filterProcess = this.props.navigation.getParam('process', true); 
        const filterPendente = this.props.navigation.getParam('pendente', true); 
        const filterResolvido = this.props.navigation.getParam('resolvido', false); 
        const filterFechado = this.props.navigation.getParam('fechado', false);
        const filterEntity = this.props.navigation.getParam('entidade', null); 

        return(
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button hasText transparent onPress={this.loadRefresh}>
                            <Icon  style={{color:"#E0FFFF"}} name="refresh" type="FontAwesome" />
                        </Button>
                       

                    </Left>
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
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={this.state.tickets.filter((item)=>{
                                return  (((filterNovo)?item.status===1:"")||
                                        ((filterProcess)?item.status===2:"")||
                                        ((filterPendente)?item.status===4:"")||
                                        ((filterResolvido)?item.status===5:"")||
                                        ((filterFechado)?item.status===6:"")
                                    )
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
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    loadView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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