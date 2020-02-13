import React, { useState, useEffect } from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { Contrast , TextRed} from '../components/Componentes';
import api from '../services/api';
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

const Home = (props) => {
    const [ entitys, setEntitys ] = useState([]);
    const [ tickets, setTickets ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ filterNovo, setFilterNovo ] = useState(false);
    const [ filterProcess, setFilterProcess ] = useState(true);
    const [ filterPendente, setFilterPendente ] = useState(true);
    const [ filterResolvido, setFilterResolvido ] = useState(true);
    const [ filterFechado, setFilterFechado ] = useState(true);
    const [ filterString, setFilterString ] = useState("tipo.type===1");

    useEffect(()=>{
        loadTickets();
    },[]);

    loadRefresh = async () => {
        setLoading(true);
        loadTickets();
    }

    loadTickets = async () => {

        try {
            const response = await api.get('/Ticket/',{
                params: {
                    expand_dropdowns: "true",
                    order: "DESC",
                    range: "0-3"
                }
            });
            const tickets = response.data;
            setTickets(tickets);
            setLoading(false);
            
            } catch (err) {
                AsyncStorage.setItem("@token", '');
                props.navigation.navigate('LoginStack');
            }
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity style={styles.productButton} onPress={() => {props.navigation.navigate('Ticket', {id: item.id})}}>
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

    if(loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
        );
    } else {

        const filterNovo = props.navigation.getParam('novo', true);
        const filterProcess = props.navigation.getParam('process', true); 
        const filterPendente = props.navigation.getParam('pendente', true); 
        const filterResolvido = props.navigation.getParam('resolvido', false); 
        const filterFechado = props.navigation.getParam('fechado', false);
        const filterEntity = props.navigation.getParam('entidade', null); 

        return(
            <Container>
                
                
                    <View style={styles.container}>
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={tickets.filter((item)=>{
                                return  (((filterNovo)?item.status===1:"")||
                                        ((filterProcess)?item.status===2:"")||
                                        ((filterPendente)?item.status===4:"")||
                                        ((filterResolvido)?item.status===5:"")||
                                        ((filterFechado)?item.status===6:"")
                                    )
                            })}
                            keyExtractor={item => String(item.id) }
                            renderItem={renderItem}
                        />
                    </View>

            </Container>
        );
        }
}


export default Home;

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