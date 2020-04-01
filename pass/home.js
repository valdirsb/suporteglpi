import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';

/*
function Pass(id, nome, login, senha, site, info) {
    this.id = id;
    this.nome = nome;
    this.login = login;
    this.senha = senha;
    this.site = site;
    this.info = info;
  }

const pass = [
    {
      id: 0,
      nome: "Nome 1",
      login: "Login 1",
      senha: "senha 1",
      site: "site 1",
      info: "info 1",
    },
    {
        id: 1,
        nome: "Nome 2",
        login: "Login 2",
        senha: "senha 2",
        site: "site 2",
        info: "info 2",
      },
];

var novaPass = new Pass(2,"Nome 3", "Login 3", "Senha 3", "Site 3", "info 3");

pass.push(novaPass);

const passconst = pass.map((v,k)=>{
    return <Text>{v.nome}</Text>
})

*/

const Home = (props) => {
    const [ passwords, setPasswords ] = useState([
        {
            id: 0,
            nome: "Nome 1",
            login: "Login 1",
            senha: "senha 1",
            site: "site 1",
            info: "info 1",
        },
        {
            id: 1,
            nome: "Nome 2",
            login: "Login 2",
            senha: "senha 2",
            site: "site 2",
            info: "info 2",
        },
        {
            id: 2,
            nome: "Nome 3",
            login: "Login 3",
            senha: "senha 3",
            site: "site 3",
            info: "info 3",
        },
        {
            id: 3,
            nome: "Nome 4",
            login: "Login 4",
            senha: "senha 4",
            site: "site 4",
            info: "info 4",
        },
        {
            id: 4,
            nome: "Nome 5",
            login: "Login 5",
            senha: "senha 5",
            site: "site 5",
            info: "info 5",
        },
    ]);


    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.containerList} onPress={()=>{props.navigation.navigate('detalhes')}}>
            <Text>{item.nome}</Text>
            <Text>{item.login}</Text>
        </TouchableOpacity>
    )
            
    return(
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={passwords}
                keyExtractor={item => String(item.id) }
                renderItem={renderItem}
            />
        </View>

    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    },
    containerList:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems:"center",
        margin: 10,
        width: 350,
        height: 45,
        borderWidth: 1,
        borderRadius: 3,
    },
})