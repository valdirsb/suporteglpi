import React, { Component } from 'react';
import api from '../services/api';
import { StyleSheet, View, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {    Container, 
            Header, 
            Left, 
            Body, 
            Title, 
            Content, 
            Icon,
            Spinner,
            Footer, 
            FooterTab, 
            Button, 
            Text, 
        } from 'native-base';

export default class NewTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            entity:null,
            entitys: [],
            userR:null,
            usersR:[],
            userA:null,
            usersA:[],
            category:null,
            categorys:[],
            titulo:"",
            descricao:"",
            user:"",
            profileType:0,

            servico:2,
            servicos: [
                {name: 'Pedido', id: 2},
                {name: 'Incidente', id: 1},
            ]
        };


    }

    componentDidMount(){
        this.loadFullSession();
        this.loadEntitys();
        this.loadUsers();
        this.loadCategorys();
    };

    loadEntitys = async () => {
        const response = await api.get('/Entity',{
            params: {
                range: "0-300"
            }
        });
        const entitys = response.data.sort(this.ordenar);
        this.setState({ entitys });
    };

    loadFullSession = async () => {
        const response = await api.get('/getFullSession');
        const user = response.data.session.glpiname;
        const profileType = response.data.session.glpiactiveprofile.id;
        this.setState({ 
            user,
            profileType,
            loading: false
        });
        
    };

    loadUsers = async () => {
        const response = await api.get('/User/',{
            params: {
                range: "0-300"
            }
        });
        const users = response.data.sort(this.ordenar);
        this.setState({ usersR: users });
        this.setState({ usersA: users });

        this.state.usersR.map((v, k) => {
            if (v.name===this.state.user){this.setState({userR: v.id})}
        });
        this.state.usersA.map((v, k) => {
            if (v.name===this.state.user){this.setState({userA: v.id})}
        });
    };

    loadCategorys = async () => {
        const response = await api.get('/ITILCategory',{
            params: {
                range: "0-300"
            }
        });
        const categorys = response.data.sort(this.ordenarCategoria);
        this.setState({ categorys });
    };
    
    createTicket = async () => {
        this.setState({loading: true});
        if(this.state.profileType!=1){
            const response = await api.post('/Ticket/',{
                    input:
                        {
                            "entities_id": this.state.entity,
                            "type": this.state.servico,
                            "itilcategories_id": this.state.category,
                            "name": this.state.titulo,
                            "content": this.state.descricao
                        }
            });

            alert(response.data.message);
            this.setState({loading: false});
            this.props.navigation.navigate('Home', {refresh: true});
        }else{
            const response = await api.post('/Ticket/',{
                input:
                    {
                        "type": this.state.servico,
                        "itilcategories_id": this.state.category,
                        "name": this.state.titulo,
                        "content": this.state.descricao
                    }
        });
        alert(response.data.message);
        this.setState({loading: false});
        this.props.navigation.navigate('Home', {refresh: true});
        }
    };

    ordenarCategoria(a, b) {
        return a.completename < b.completename ? -1 :a.completename > b.completename ? 1 : 0;
    };

    ordenar(a, b) {
        return a.name < b.name ? -1 :a.name > b.name ? 1 : 0;
    };

    render() {

    if(this.state.loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
        );
    } else {
        
        const pickerEntity = this.state.entitys.map((v,k) => {
            return {key: k, label: v.name, value: v.id }
        });

        const pickerusersR = this.state.usersR.map((v,k) => {
            return {key: k, label: v.firstname+' '+v.realname, value: v.id }
        });

        const pickerusersA = this.state.usersA.map((v,k) => {
            return {key: k, label: v.firstname+' '+v.realname, value: v.id }
        });

        const pickerServico = this.state.servicos.map((v,k) => {
            return {key: k, label: v.name, value: v.id }
        });

        const pickerCategory = this.state.categorys.map((v,k) => {
            return {key: k, label: v.name, value: v.id, section: (v.level===1)?true:false }
        });

        return (
            <Container>
                <Header  style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Abrir Novo Chamado</Title>
                    </Body>
                </Header>
                <Content>


                    <View style={styles.conteiner}>

                    {(() => {
                            if(this.state.profileType!=1){
                                return <View>

                                    <View style={styles.row}>
                                        <View style={styles.backText}>
                                            <Text style={styles.text}>Entidade: </Text>
                                        </View>
                                        <View style={styles.backEnt}>
                                            <ModalSelector
                                                data={pickerEntity}
                                                initValue="Selecionar  ▼"
                                                optionContainerStyle={{backgroundColor: '#fff'}}
                                                cancelContainerStyle={{backgroundColor: '#fff'}}
                                                sectionStyle={{backgroundColor: '#184782'}}
                                                sectionTextStyle={{color:'#fff'}}
                                                cancelText="Fechar"
                                                onChange={(option)=>{ this.setState({entity:option.value}) }} 
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={styles.text2}>Requerente:</Text>
                                            <View style={styles.back}>
                                                <ModalSelector
                                                    data={pickerusersR}
                                                    initValue="Selecionar  ▼"
                                                    optionContainerStyle={{backgroundColor: '#fff'}}
                                                    cancelContainerStyle={{backgroundColor: '#fff'}}
                                                    sectionStyle={{backgroundColor: '#184782'}}
                                                    sectionTextStyle={{color:'#fff'}}
                                                    cancelText="Fechar"
                                                    onChange={(option)=>{ this.setState({userR:option.value}) }} 
                                                />
                                            </View>
                                            
                                        </View>
                                        <View>
                                            <Text style={styles.text2}>Atribuído:</Text>
                                            <View style={styles.back}>
                                                <ModalSelector
                                                    data={pickerusersA}
                                                    initValue="Selecionar  ▼"
                                                    optionContainerStyle={{backgroundColor: '#fff'}}
                                                    cancelContainerStyle={{backgroundColor: '#fff'}}
                                                    sectionStyle={{backgroundColor: '#184782'}}
                                                    sectionTextStyle={{color:'#fff'}}
                                                    cancelText="Fechar"
                                                    onChange={(option)=>{ this.setState({userA:option.value}) }} 
                                                />
                                            </View>
                                            
                                        </View>
                                    </View>
                                </View>;
                            }
                    })()}


                        <View style={styles.row}>
                            <View>
                                <Text style={styles.text2}>Tipo:</Text>
                                <View style={styles.back}>
                                    <ModalSelector
                                        data={pickerServico}
                                        initValue="Pedido "
                                        optionContainerStyle={{backgroundColor: '#fff'}}
                                        cancelContainerStyle={{backgroundColor: '#fff'}}
                                        sectionStyle={{backgroundColor: '#184782'}}
                                        sectionTextStyle={{color:'#fff'}}
                                        cancelText="Fechar"
                                        onChange={(option)=>{ this.setState({servico:option.value}) }} 
                                    />
                                </View>
                                
                            </View>
                            <View>
                                <Text style={styles.text2}>Categoria:</Text>
                                <View style={styles.back}>
                                    <ModalSelector
                                        data={pickerCategory}
                                        initValue="Selecionar  ▼"
                                        optionContainerStyle={{backgroundColor: '#fff'}}
                                        cancelContainerStyle={{backgroundColor: '#fff'}}
                                        sectionStyle={{backgroundColor: '#184782'}}
                                        sectionTextStyle={{color:'#fff'}}
                                        cancelText="Fechar"
                                        onChange={(option)=>{ this.setState({category:option.value}) }} 
                                    />
                                </View>
                                
                            </View>
                            
                        </View>

                        <View style={styles.column}>
                            
                            <Text style={styles.text}>Título do Chamado:</Text>
                            
                            <TextInput style={styles.input} onChangeText={(titulo)=>this.setState({titulo})} value={this.state.titulo} />

                            <Text style={styles.text}>Descrição do Chamado:</Text>
                            
                            <TextInput numberOfLines={4} multiline style={styles.input}  onChangeText={(descricao)=>this.setState({descricao})} value={this.state.descricao} />
                            
                            <Button block style={styles.ticketButton} onPress={this.createTicket} >
                                <Text>Enviar</Text>
                            </Button>

                        </View>
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => {this.props.navigation.navigate('Info')}}>
                            <Icon name="info" type="Feather" />
                            <Text>Info</Text>
                        </Button>
                        <Button vertical onPress={() => {this.props.navigation.navigate('Home')}}>
                            <Icon active name="list" type="Feather" />
                            <Text>Chamados</Text>
                        </Button>
                        <Button vertical active onPress={() => {this.props.navigation.navigate('NewTicket')}}>
                            <Icon name="file-plus" type="Feather" />
                            <Text>Abrir Chamado</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
        }
    }
}

const styles = StyleSheet.create({
    loadView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ticketButton: {
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "#184782",

    },
    header: {
        backgroundColor: "#184782",
    },
    conteiner: {
        flex: 1,
        padding: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    text:{
        fontSize: 20,
        color: "#888",

    },
    text2:{
        fontSize: 16,
        color: "#888",

    },
    input: {
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
        marginBottom: 5,
    },
    back: {
        width: 160
    },
    backEnt:{
        width: 230
    },
    backText: {
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
    }


})
