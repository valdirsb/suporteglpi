import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {StyleSheet, ScrollView, Dimensions, View, FlatList, Alert, TouchableHighlight, Modal, TextInput} from 'react-native';
import { Contrast } from '../components/Componentes';
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
    Spinner,
    ListItem,
    List,
    Footer,
    FooterTab,

  } from "native-base";

import styles from "./styles";

const TicketProcess =  (props) => {
    const [ loading, setLoading ] = useState(true);
    const [ lineTime, setLineTime ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalVisible2, setModalVisible2 ] = useState(false);
    const [ modalVisible3, setModalVisible3 ] = useState(false);
    const [ modalVisible4, setModalVisible4 ] = useState(false);
    const [ contentFollowup, setContentFollowup ] = useState("");
    const [ contentTask, setContentTask ] = useState("");
    const [ contentSolution, setContentSolution ] = useState("");

    useEffect(()=>{
        loadLineTime();
    },[]);

    loadLineTime = async () => {
        const id = props.navigation.getParam('id');
        const responseTask = await api.get(`Ticket/${id}/TicketTask/`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const lTask = responseTask.data;

        const responseFollowup = await api.get(`Ticket/${id}/ITILFollowup/`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const lFollowup = responseFollowup.data;

        const responseSolution = await api.get(`Ticket/${id}/ITILSolution/`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const lSolution = responseSolution.data;

        setLineTime([...lTask, ...lFollowup, ...lSolution]);
        setLoading(false);

    };

    createTask = async () => {
        setModalVisible2(!modalVisible2);
        setLoading(true);
        try {
            const id = props.navigation.getParam('id');
            const response = await api.post('/TicketTask/',{
                input:
                        {
                            "tickets_id": id,
                            "content": contentTask,
                            "is_private": "0",
                        }
            });
            const response2 = await api.get(`/TicketTask/${response.data.id}`,{
                params: {
                    expand_dropdowns: "true"
                }
            });
            const task2 = response2.data;
            setLineTime([...lineTime, task2]);
            setContentTask("");
            
            alert(response.data.message+"Adicionado com sucesso!");

        } catch (_err) {
            alert("Ocorreu algum Erro");
        }
        setLoading(false);
    };

    createFollowup = async () => {
        setModalVisible(!modalVisible);
        setLoading(true);
        try {
            const id = props.navigation.getParam('id');
            const response = await api.post('/ITILFollowup/',{
                input:
                        {
                            "items_id": id,
                            "itemtype": "Ticket",
                            "content": contentFollowup,
                            "is_private": "0",
                            "requesttypes_id": "1"
                        }
            });
            const response2 = await api.get(`/ITILFollowup/${response.data.id}`,{
                params: {
                    expand_dropdowns: "true"
                }
            });
            const followup2 = response2.data;
            setLineTime([...lineTime, followup2]);
            setContentFollowup("");
            
            alert(response.data.message+"Adicionado com sucesso!");

        } catch (_err) {
            alert("Ocorreu algum Erro");
        }
        setLoading(false);
    };


    createSolution = async () => {
        setModalVisible4(!modalVisible4);
        setLoading(true);
        try {
            const id = props.navigation.getParam('id');
            const response = await api.post('/ITILSolution/',{
                input:
                        {
                            "items_id": id,
                            "itemtype": "Ticket",
                            "content": contentSolution,
                        }
        });
        const response2 = await api.get(`/ITILSolution/${response.data.id}`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const solution2 = response2.data;
        setLineTime([...lineTime, solution2]);
        setContentSolution("");
        
        alert(response.data.message+"Adicionado com sucesso!");

        } catch (_err) {
            alert("Ocorreu algum Erro");
        }
        setLoading(false);
    };

    renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.h2}>{item.users_id}</Text>
            <Text style={styles.text}>{item.content}</Text>
            <Text>{item.date_creation}</Text>
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

        return (
            <Container>
                <Content style={styles.container}>

                    <FlatList
                        contentContainerStyle={styles.list}
                        data={lineTime.sort((a,b) => a.date_creation < b.date_creation)}
                        keyExtractor={item => String(item.id) }
                        renderItem={renderItem}
                    />
                </Content>

                
                    <View style={{marginTop: 22}}>
                        <Modal
                        animationType="slide"
                        presentationStyle="overFullScreen"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                            <View style={styles.modal}>
                                <View>
                                    <Text style={styles.h1}>Acompanhamento</Text>
                                    <TextInput numberOfLines={6} multiline style={styles.input} onChangeText={(content)=>setContentFollowup(content)} value={contentFollowup}/>
                                    <Button block style={styles.ticketButton} onPress={createFollowup} >
                                        <Text>Enviar</Text>
                                    </Button>
                                    <Button block style={styles.ticketButton2} onPress={() => {
                                    setModalVisible(!modalVisible);
                                    }} >
                                        <Text>Cancelar</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                        animationType="slide"
                        presentationStyle="overFullScreen"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                            <View style={styles.modal}>
                                <View>
                                    <Text style={styles.h1}>Tarefas</Text>
                                    <TextInput numberOfLines={6} multiline style={styles.input} onChangeText={(content)=>setContentTask(content)} value={contentTask}/>
                                    <Button block style={styles.ticketButton} onPress={createTask} >
                                        <Text>Enviar</Text>
                                    </Button>
                                    <Button block style={styles.ticketButton2} onPress={() => {
                                    setModalVisible2(!modalVisible2);
                                    }} >
                                        <Text>Cancelar</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                        animationType="slide"
                        presentationStyle="overFullScreen"
                        transparent={true}
                        visible={modalVisible4}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                            <View style={styles.modal}>
                                <View>
                                    <Text style={styles.h1}>Solução</Text>
                                    <TextInput numberOfLines={6} multiline style={styles.input} onChangeText={(content)=>setContentSolution(content)} value={contentSolution}/>
                                    <Button block style={styles.ticketButton} onPress={createSolution} >
                                        <Text>Enviar</Text>
                                    </Button>
                                    <Button block style={styles.ticketButton2} onPress={() => {
                                    setModalVisible4(!modalVisible4);
                                    }} >
                                        <Text>Cancelar</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>

                        
                    </View>
                

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => {
                            setModalVisible(true);
                        }}>
                            <Icon name="tooltip-text" type="MaterialCommunityIcons" />
                            <Text>Acompa...</Text>
                        </Button>
                        <Button vertical onPress={() => {
                            setModalVisible2(true);
                        }}>
                            <Icon active name="wrench" type="MaterialCommunityIcons" />
                            <Text>Tarefa</Text>
                        </Button>
                        <Button vertical onPress={() => {props.navigation.navigate('')}}>
                            <Icon name="paperclip" type="MaterialCommunityIcons" />
                            <Text>Arquivo</Text>
                        </Button>
                        <Button vertical onPress={() => {
                            setModalVisible4(true);
                        }}>
                            <Icon name="thumbs-o-up" type="FontAwesome" />
                            <Text>Solução</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

    
}


TicketProcess.navigationOptions = (props) => {
    return{
        headerTitle:"Process. Chamado "+props.navigation.getParam('id')
        
    }
};

export default TicketProcess;