import React, { useState, useEffect } from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import api from '../services/api';
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

const NewTickets = (props) => {
    const [ loading, setLoading ] = useState(true);
    const [ entity, setEntity ] = useState(null);
    const [ entityName, setEntityName ] = useState(null);
    const [ entitys, setEntitys ] = useState([]);
    const [ userR, setUserR ] = useState(null);
    const [ userRname, setUserRname ] = useState(null);
    const [ usersR, setUsersR ] = useState([]);
    const [ userA, setUserA ] = useState(null);
    const [ userAname, setUserAname ] = useState(null);
    const [ usersA, setUsersA ] = useState([]);
    const [ category, setCategory ] = useState(null);
    const [ categoryName, setCategoryName ] = useState(null);
    const [ categorys, setCategorys ] = useState([]);
    const [ titulo, setTitulo ] = useState("");
    const [ descricao, setDescricao ] = useState("");
    const [ user, setUser ] = useState("");
    const [ profileType, setProfileType ] = useState(0);
    const [ servico, setServico ] = useState(2);
    const [ servicoName, setServicoName ] = useState(null);
    const [ servicos, setServicos ] = useState( [
                                                    {name: 'Pedido', id: 2},
                                                    {name: 'Incidente', id: 1},
                                                ]);

    useEffect(()=>{
        loadFullSession();
        loadEntitys();
        loadUsers();
        loadCategorys()
    },[]);

    loadEntitys = async () => {
        const response = await api.get('/Entity',{
            params: {
                range: "0-300"
            }
        });
        const entitys = response.data.sort(this.ordenarNomeCompleto);
        setEntitys(entitys)
    };
    
    loadFullSession = async () => {
        const response = await api.get('/getFullSession');
        const user = response.data.session.glpiname;
        const profileType = response.data.session.glpiactiveprofile.id;
        setUser(user);
        setProfileType(profileType);
        setLoading(false);
    };

    loadUsers = async () => {
        const response = await api.get('/User/',{
            params: {
                range: "0-300"
            }
        });
        const users = response.data.sort(this.ordenar);
        setUsersR(users);
        setUsersA(users);

        usersR.map((v, k) => {
            if (v.name===user){setUserR(v.id)}
        });
        usersA.map((v, k) => {
            if (v.name===user){setUserA(v.id)}
        });
    };

    loadCategorys = async () => {
        const response = await api.get('/ITILCategory',{
            params: {
                range: "0-300"
            }
        });
        const categorys = response.data.sort(this.ordenarNomeCompleto);
        setCategorys(categorys);
    };

    createTicket = async () => {
        setLoading(true);
        if(profileType!=1){
            const response = await api.post('/Ticket/',{
                    input:
                        {
                            "entities_id": entity,
                            "type": servico,
                            "itilcategories_id": category,
                            "name": titulo,
                            "content": descricao,
                            "_users_id_requester": userR,
                            "_users_id_assign": userA
                        }
            });


            alert(response.data.message);
            setLoading(false);
            props.navigation.navigate('Home');
            loadRefresh();
        }else{
            const response = await api.post('/Ticket/',{
                input:
                    {
                        "type": servico,
                        "itilcategories_id": category,
                        "name": titulo,
                        "content": descricao
                    }
            });
            alert(response.data.message);
            setLoading(false);
            props.navigation.navigate('Home');
            loadRefresh();
            }
    };

    ordenarNomeCompleto = (a, b) => {
        return a.completename < b.completename ? -1 :a.completename > b.completename ? 1 : 0;
    };

    ordenar = (a, b) => {
        return a.name < b.name ? -1 :a.name > b.name ? 1 : 0;
    };


    if(loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
        );
    } else {
        
        const pickerEntity = entitys.map((v,k) => {
            return {key: k, label: v.name, value: v.id, section: (v.level===1)?true:false}
        });

        const pickerusersR = usersR.map((v,k) => {
            return {key: k, label: v.firstname+' '+v.realname, value: v.id }
        });

        const pickerusersA = usersA.map((v,k) => {
            return {key: k, label: v.firstname+' '+v.realname, value: v.id }
        });

        const pickerServico = servicos.map((v,k) => {
            return {key: k, label: v.name, value: v.id }
        });

        const pickerCategory = categorys.map((v,k) => {
            return {key: k, label: v.name, value: v.id, section: (v.level===1)?true:false }
        });

        return (
            <Container>
                <Content>


                    <View style={styles.conteiner}>

                    {(() => {
                            if(profileType!=1){
                                return <View>

                                    <View style={styles.row}>
                                        <View style={styles.backText}>
                                            <Text style={styles.text}>Entidade: </Text>
                                        </View>
                                        <View style={styles.backEnt}>
                                            <ModalSelector
                                                data={pickerEntity}
                                                supportedOrientations={['landscape']}
                                                scrollViewAccessibilityLabel={'Scrollable options'}
                                                optionContainerStyle={{backgroundColor: '#fff'}}
                                                cancelContainerStyle={{backgroundColor: '#fff'}}
                                                cancelText="Fechar"
                                                sectionStyle={{backgroundColor: '#184782'}}
                                                sectionTextStyle={{color:'#fff'}}
                                                onChange={(option)=>{ setEntity(option.value), setEntityName(option.label) }}>

                                                <TextInput
                                                    style={styles.inputArea}
                                                    editable={true}
                                                    placeholder="Escolha uma Entidade   ▼"
                                                    value={entityName} />

                                            </ModalSelector>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={styles.text2}>Requerente:</Text>
                                            <View style={styles.back}>
                                                <ModalSelector
                                                    data={pickerusersR}
                                                    supportedOrientations={['landscape']}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    optionContainerStyle={{backgroundColor: '#fff'}}
                                                    cancelContainerStyle={{backgroundColor: '#fff'}}
                                                    sectionStyle={{backgroundColor: '#184782'}}
                                                    sectionTextStyle={{color:'#fff'}}
                                                    cancelText="Fechar"
                                                    onChange={(option)=>{setUserR(option.value), setUserRname(option.label) }}>

                                                    <TextInput
                                                        style={styles.inputArea}
                                                        editable={true}
                                                        placeholder="Selecionar  ▼"
                                                        value={userRname} />
                                                </ModalSelector>
                                            </View>
                                            
                                        </View>
                                        <View>
                                            <Text style={styles.text2}>Atribuído:</Text>
                                            <View style={styles.back}>
                                                <ModalSelector
                                                    data={pickerusersA}
                                                    supportedOrientations={['landscape']}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    optionContainerStyle={{backgroundColor: '#fff'}}
                                                    cancelContainerStyle={{backgroundColor: '#fff'}}
                                                    sectionStyle={{backgroundColor: '#184782'}}
                                                    sectionTextStyle={{color:'#fff'}}
                                                    cancelText="Fechar"
                                                    onChange={(option)=>{setUserA(option.value), setUserAname(option.label)}}>

                                                    <TextInput
                                                        style={styles.inputArea}
                                                        editable={true}
                                                        placeholder="Selecionar  ▼"
                                                        value={userAname} />

                                                </ModalSelector>
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
                                        supportedOrientations={['landscape']}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        optionContainerStyle={{backgroundColor: '#fff'}}
                                        cancelContainerStyle={{backgroundColor: '#fff'}}
                                        sectionStyle={{backgroundColor: '#184782'}}
                                        sectionTextStyle={{color:'#fff'}}
                                        cancelText="Fechar"
                                        onChange={(option)=>{setServico(option.value), setServicoName(option.label)}} >
                                        <TextInput
                                            style={styles.inputArea}
                                            editable={true}
                                            placeholder="Pedido"
                                            value={servicoName} />
                                    </ModalSelector>
                                </View>
                                
                            </View>
                            <View>
                                <Text style={styles.text2}>Categoria:</Text>
                                <View style={styles.back}>
                                    <ModalSelector
                                        data={pickerCategory}
                                        supportedOrientations={['landscape']}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        optionContainerStyle={{backgroundColor: '#fff'}}
                                        cancelContainerStyle={{backgroundColor: '#fff'}}
                                        sectionStyle={{backgroundColor: '#184782'}}
                                        sectionTextStyle={{color:'#fff'}}
                                        cancelText="Fechar"
                                        onChange={(option)=>{setCategory(option.value), setCategoryName(option.label)}} >

                                        <TextInput
                                            style={styles.inputArea}
                                            editable={true}
                                            placeholder="Selecionar  ▼"
                                            value={categoryName} />
                                    </ModalSelector>
                                </View>
                                
                            </View>
                            
                        </View>

                        <View style={styles.column}>
                            <Text>{entity}</Text>
                            
                            <Text style={styles.text}>Título do Chamado:</Text>
                            
                            <TextInput style={styles.input} onChangeText={(titulo)=>setTitulo(titulo)} value={titulo} />

                            <Text style={styles.text}>Descrição do Chamado:</Text>
                            
                            <TextInput numberOfLines={4} multiline style={styles.input}  onChangeText={(descricao)=>setDescricao(descricao)} value={descricao} />
                            
                            <Button block style={styles.ticketButton} onPress={createTicket} >
                                <Text>Enviar</Text>
                            </Button>

                        </View>
                    </View>
                </Content>
            </Container>
        )
        }
}

NewTickets.navigationOptions = (props) => {
    return{
        headerTitle:"Abrir novo Chamado ",
        
    }
};

export default NewTickets;

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
    },
    inputArea:{
        fontSize: 16,
        textAlign: "center",
        borderWidth:1, 
        borderColor:'#ccc', 
        padding:10, 
        height:40,
        borderRadius: 5
    }


})