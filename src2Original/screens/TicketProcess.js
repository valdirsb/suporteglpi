import React, { Component } from 'react';
import api from '../services/api';
import { StyleSheet, ScrollView, Dimensions, View, FlatList, Alert, TouchableHighlight, Modal, TextInput } from 'react-native';

import { Contrast , TextRed} from './Componentes';

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


export default class TicketProcess extends Component {

    state = {
        followup: [],
        loadingFollowup: true,
        task: [],
        loadingTask: true,
        solution: [],
        loadingSolution: true,
        lineTime:[],
        modalVisible: false,
        modalVisible2: false,
        modalVisible3: false,
        modalVisible4: false,
        contentFollowup: "",
        contentTask: "",
        contentSolution: "",
    };

    componentDidMount(){
        this.loadFollowup();
        this.loadTask();
        this.loadSolution();
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    setModalVisible2(visible) {
        this.setState({modalVisible2: visible});
    };

    setModalVisible3(visible) {
        this.setState({modalVisible3: visible});
    }

    setModalVisible4(visible) {
        this.setState({modalVisible4: visible});
    }

    loadTask = async () => {
        const id = this.props.navigation.getParam('id');
        const response = await api.get(`Ticket/${id}/TicketTask/`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const task = response.data;
        this.setState({ 
            task,
            lineTime: [...this.state.lineTime, ...task],
            loadingTask: false
         });
    };

    createTask = async () => {
        this.setModalVisible2(!this.state.modalVisible2);
        this.setState({loadingTask: true});
        try {
            const id = this.props.navigation.getParam('id');
            const response = await api.post('/TicketTask/',{
                input:
                        {
                            "tickets_id": id,
                            "content": this.state.contentTask,
                            "is_private": "0",
                        }
            });
            const response2 = await api.get(`/TicketTask/${response.data.id}`,{
                params: {
                    expand_dropdowns: "true"
                }
            });
            const task2 = response2.data;
            this.setState({ 
                lineTime: [...this.state.lineTime, task2],
            });
            
            alert(response.data.message+"Adicionado com sucesso!");

        } catch (_err) {
            alert("Ocorreu algum Erro");
        }
        this.setState({loadingTask: false});
    };

    loadFollowup = async () => {
        const id = this.props.navigation.getParam('id');
        const response = await api.get(`Ticket/${id}/ITILFollowup/`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const followup = response.data;
        this.setState({
            followup,
            lineTime: [...this.state.lineTime, ...followup],
            loadingFollowup: false
        });
    };

    createFollowup = async () => {
        this.setModalVisible(!this.state.modalVisible);
        this.setState({loadingFollowup: true});
        try {
            const id = this.props.navigation.getParam('id');
            const response = await api.post('/ITILFollowup/',{
                input:
                        {
                            "items_id": id,
                            "itemtype": "Ticket",
                            "content": this.state.contentFollowup,
                            "is_private": "0",
                            "requesttypes_id": "1"
                        }
            });
            const response2 = await api.get(`/ITILFollowup/${response.data.id}`,{
                params: {
                    expand_dropdowns: "true"
                }
            });
            const followup = response2.data;
            this.setState({ 
                lineTime: [...this.state.lineTime, followup],
            });
            
            alert(response.data.message+"Adicionado com sucesso!");

        } catch (_err) {
            alert("Ocorreu algum Erro");
        }
        this.setState({loadingFollowup: false});
    };


    loadSolution = async () => {
        const id = this.props.navigation.getParam('id');
        const response = await api.get(`Ticket/${id}/ITILSolution/`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const solution = response.data;
        this.setState({ 
            solution,
            lineTime: [...this.state.lineTime, ...solution],
            loadingSolution: false
         });
    };

    createSolution = async () => {
        this.setModalVisible4(!this.state.modalVisible4);
        this.setState({loadingSolution: true});
        try {
            const id = this.props.navigation.getParam('id');
            const response = await api.post('/ITILSolution/',{
                input:
                        {
                            "items_id": id,
                            "itemtype": "Ticket",
                            "content": this.state.contentSolution,
                        }
        });
        const response2 = await api.get(`/ITILSolution/${response.data.id}`,{
            params: {
                expand_dropdowns: "true"
            }
        });
        const solution = response2.data;
        this.setState({ 
            lineTime: [...this.state.lineTime, solution],
        });
        
        alert(response.data.message+"Adicionado com sucesso!");

        } catch (_err) {
            alert("Ocorreu algum Erro");
        }
        this.setState({loadingSolution: false});
    };

    

    renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.h2}>{item.users_id}</Text>
            <Text style={styles.text}>{item.content}</Text>
            <Text>{item.date_creation}</Text>
        </View>
    )

    render() {

        if(this.state.loadingFollowup||this.state.loadingTask||this.state.loadingSolution){
            return (
                <View style={styles.loadView}>
                    <Spinner color='blue' />
                    <Text>Carregando...</Text>
                </View>
            );
        } else {
            return (
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Processamento</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content style={styles.container}>

                        <FlatList
                            contentContainerStyle={styles.list}
                            data={this.state.lineTime.sort((a,b) => a.date_creation < b.date_creation)}
                            keyExtractor={item => String(item.id) }
                            renderItem={this.renderItem}
                        />
                    </Content>

                    
                        <View style={{marginTop: 22}}>
                            <Modal
                            animationType="slide"
                            presentationStyle="overFullScreen"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                                <View style={styles.modal}>
                                    <View>
                                        <Text style={styles.h1}>Acompanhamento</Text>
                                        <TextInput numberOfLines={6} multiline style={styles.input} onChangeText={(contentFollowup)=>this.setState({contentFollowup})} value={this.state.contentFollowup}/>
                                        <Button block style={styles.ticketButton} onPress={this.createFollowup} >
                                            <Text>Enviar</Text>
                                        </Button>
                                        <Button block style={styles.ticketButton2} onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
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
                            visible={this.state.modalVisible2}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                                <View style={styles.modal}>
                                    <View>
                                        <Text style={styles.h1}>Tarefas</Text>
                                        <TextInput numberOfLines={6} multiline style={styles.input} onChangeText={(contentTask)=>this.setState({contentTask})} value={this.state.contentTask}/>
                                        <Button block style={styles.ticketButton} onPress={this.createTask} >
                                            <Text>Enviar</Text>
                                        </Button>
                                        <Button block style={styles.ticketButton2} onPress={() => {
                                        this.setModalVisible2(!this.state.modalVisible2);
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
                            visible={this.state.modalVisible4}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                                <View style={styles.modal}>
                                    <View>
                                        <Text style={styles.h1}>Solução</Text>
                                        <TextInput numberOfLines={6} multiline style={styles.input} onChangeText={(contentSolution)=>this.setState({contentSolution})} value={this.state.contentSolution}/>
                                        <Button block style={styles.ticketButton} onPress={this.createSolution} >
                                            <Text>Enviar</Text>
                                        </Button>
                                        <Button block style={styles.ticketButton2} onPress={() => {
                                        this.setModalVisible4(!this.state.modalVisible4);
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
                                this.setModalVisible(true);
                            }}>
                                <Icon name="tooltip-text" type="MaterialCommunityIcons" />
                                <Text>Acompa...</Text>
                            </Button>
                            <Button vertical onPress={() => {
                                this.setModalVisible2(true);
                            }}>
                                <Icon active name="wrench" type="MaterialCommunityIcons" />
                                <Text>Tarefa</Text>
                            </Button>
                            <Button vertical onPress={() => {this.props.navigation.navigate('')}}>
                                <Icon name="paperclip" type="MaterialCommunityIcons" />
                                <Text>Arquivo</Text>
                            </Button>
                            <Button vertical onPress={() => {
                                this.setModalVisible4(true);
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
}

