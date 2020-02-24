import React, { useState, useEffect } from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { Contrast } from '../components/Componentes';
import api from '../services/api';
import {
    Container,
    Spinner,
    Text,
  } from "native-base";

const Home = (props) => {
    const [ entitys, setEntitys ] = useState([]);
    const [ user, setUser ] = useState(null);
    const [ profileType, setProfileType ] = useState(0);
    const [ tickets, setTickets ] = useState([]);
    const [ filterParams, setFilterParams ] = useState({sort: 2, order: "DESC", range: "0-100"});
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        loadTickets();
        loadFullSession();
    },[filterParams]);

    loadRefresh = async () => {
        setLoading(true);
        loadTickets();
    }

    loadFilter = (p) => {
        switch (p) {
            case 0: 
                setFilterParams({ sort: 2, order: "DESC", range: "0-100",
                                'is_deleted': 0,
                                'criteria[0][field]': 4,
                                'criteria[0][searchtype]': "equals",
                                'criteria[0][value]':user
                                })
                break;
            case 1: 
                setFilterParams({ sort: 2, order: "DESC", range: "0-100",
                                'is_deleted': 0,
                                'criteria[0][field]': 5,
                                'criteria[0][searchtype]': "equals",
                                'criteria[0][value]':user
                                })
                break;
            case 2: 
                setFilterParams({ sort: 2, order: "DESC", range: "0-100",
                                'is_deleted': 0
                                })
                break;
            default: 
                alert("Caso nenhum");
            }
    }

    loadFullSession = async () => {
        const response = await api.get('/getFullSession');
        const user = response.data.session.glpiID;
        const profileType = response.data.session.glpiactiveprofile.id;
        setUser(user);
        setProfileType(profileType);
    };

    loadTickets = async () => {
        setLoading(true);
        try {
            const response = await api.get('search/Ticket/',{
                params: filterParams
            });
            const ltickets = response.data;
            setTickets(ltickets);
            setLoading(false);
            } catch (err) {
                AsyncStorage.setItem("@token", '');
                props.navigation.navigate('LoginStack');
            }
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity style={styles.productButton} onPress={() => {props.navigation.navigate('Ticket', {id: item[2]})}}>
                <View style={styles.ticketHeader}>
                    <View style={styles.ticketLeft}>
                        <Text style={styles.ticketHeaderText}>{item[80]}</Text>
                    </View>
                    <View style={styles.ticketRight}>
                        <View style={styles.ticketDate}>
                            <Text style={styles.ticketFootDateText}>{moment(item[15]).format('DD/MM/YY - HH:mm:ss')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.ticketBody}>
                    <Text style={styles.ticketTitle}>{item[1]}</Text>
                </View>
                <View style={styles.ticketFoot}>
                    
                    {(() => {
                                switch (item[14]) {
                                case 1:   return <Contrast icon='!' color='#E69B6A'>INCIDENTE</Contrast>;
                                case 2: return <Contrast icon='?' color='#179FD0'>PEDIDO</Contrast>;
                                default:      return <Text>Nenhum</Text>;
                                }
                    })()}

                    <View style={styles.ticketRight}>
                        <Contrast icon='ID' fontSize={18} color='#999'>{item[2]}</Contrast>
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
        const filterProcessPlan = props.navigation.getParam('processPlan', true); 
        const filterPendente = props.navigation.getParam('pendente', true); 
        const filterResolvido = props.navigation.getParam('resolvido', false); 
        const filterFechado = props.navigation.getParam('fechado', false);
        const filterEntity = props.navigation.getParam('entidade', null); 

        return(
            <Container>
                
                
                    <View style={styles.container}>
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={tickets.data.filter((item)=>{
                                return  (((filterNovo)?item[12]===1:"")||
                                        ((filterProcess)?item[12]===2:"")||
                                        ((filterProcessPlan)?item[12]===3:"")||
                                        ((filterPendente)?item[12]===4:"")||
                                        ((filterResolvido)?item[12]===5:"")||
                                        ((filterFechado)?item[12]===6:"")
                                    )
                            })}
                            keyExtractor={item => String(item[2]) }
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