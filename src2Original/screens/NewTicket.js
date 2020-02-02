import React, { Component } from 'react';
import api from '../services/api';
import { StyleSheet, View, TextInput } from 'react-native';
import {    Container, 
            Header, 
            Left, 
            Body, 
            Title, 
            Content, 
            Icon,
            Spinner,
            Form, 
            Picker, 
            Item, 
            Footer, 
            FooterTab, 
            Button, 
            Text, 
            Label,
            Input,
            Textarea,
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
                {nome: 'Pedido', id: 2},
                {nome: 'Incidente', id: 1},
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
        const entitys = response.data;
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
        const users = response.data;
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
                range: "0-300",
                'searchText[level]': 2
            }
        });
        const categorys = response.data.sort(this.ordenar);
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

    ordenar(a, b) {
        if (a.completename > b.completename) {
          return 1;
        }
        if (a.completename < b.completename) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }

    render() {

    if(this.state.loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
        );
    } else {

        let entitysItems = this.state.entitys.map((v, k) => {
            return <Picker.Item key={k} value={v.id} label={v.name} />
        });
        let usersRItems = this.state.usersR.map((v, k) => {
            return <Picker.Item key={k} value={v.id} label={v.name} />
        });
        let usersAItems = this.state.usersA.map((v, k) => {
            return <Picker.Item key={k} value={v.id} label={v.name} />
        });
        let categorysItems = this.state.categorys.map((v, k) => {
            return <Picker.Item key={k} value={v.id} label={v.completename} />
        });
        let servicosItems = this.state.servicos.map((v, k) => {
            return <Picker.Item key={k} value={v.id} label={v.nome} />
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
                                            <Picker selectedValue={this.state.entity} onValueChange={(itemValue, itemIndex) => this.setState({entity:itemValue})} >
                                                {entitysItems}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={styles.text2}>Requerente:</Text>
                                            <View style={styles.back}>
                                                <Picker  selectedValue={this.state.userR} onValueChange={(itemValue, itemIndex) => this.setState({userR:itemValue})} >
                                                    {usersRItems}
                                                </Picker>
                                            </View>
                                            
                                        </View>
                                        <View>
                                            <Text style={styles.text2}>Atribuído:</Text>
                                            <View style={styles.back}>
                                                <Picker  selectedValue={this.state.userA} onValueChange={(itemValue, itemIndex) => this.setState({userA:itemValue})} >
                                                    {usersAItems}
                                                </Picker>
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
                                    <Picker selectedValue={this.state.servico} onValueChange={(itemValue, itemIndex) => this.setState({servico:itemValue})} >
                                        {servicosItems}
                                    </Picker>
                                </View>
                                
                            </View>
                            <View>
                                <Text style={styles.text2}>Categoria:</Text>
                                <View style={styles.back}>
                                    <Picker selectedValue={this.state.category} onValueChange={(itemValue, itemIndex) => this.setState({category:itemValue})} >
                                        {categorysItems}
                                    </Picker>
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

    },
    text2:{
        fontSize: 16,

    },
    input: {
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
        marginBottom: 5,
    },
    back: {
        width: 160,
        height: 45,
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
    },
    backEnt:{
        width: 230,
        height: 45,
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
    },
    backText: {
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
    }


})
