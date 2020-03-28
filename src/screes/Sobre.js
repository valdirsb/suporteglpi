import React, { Component } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Container, Icon, Content, Accordion } from 'native-base';


const logoImageApp = require("../assets/ic_launcher_round.png");

const versionArray = [
    { title: "Alteração 1", content: "Correções realizadas nos filtros." },
    { title: "Alteração 2", content: "Correção na exibição das informações de usuários atribuidos e requerentes." },
    { title: "Alteração 3", content: 'Criação da pagina "Sobre o App" com informações das notas da versão.' },
    { title: "Alteração 3", content: "Alterações feita no layout do aplicativo" }
  ];

const dataArray = [
    { title: "Versão 0.5", content: "text ..." , versionArray },
  ];

_renderHeader = (item, expanded) => {
    return (
        <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#b7daf8" }}>
        <Text style={{ fontWeight: "600" }}>
            {" "}{item.title}
        </Text>
        {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />}
        </View>
    );
}
_renderContent = (item) => {

    const content = item.versionArray.map((v,k) => {
        return (
            <View style={styles.backContent}>
                <Icon name="checkbox" type="Foundation" style={{color:"#BBB"}} />
            <Text style={styles.textApp}>{v.content}</Text>
            </View>
            );
    });
    
    return content
}


const Sobre = (props) => {

            
    return(
        <Container style={styles.container}>
            <Content>
                <View style={styles.logoImageApp}>
                    <Image source={logoImageApp} />
                </View>
                
                <Text style={styles.textAppTitle}>SUPORTE FST</Text>
                <Text style={styles.textAppVersion}>Versão 0.6</Text>

                <View style={styles.containerAppNotes}>
                    
                    <Text style={styles.textAppNotes}>Notas da Versão:</Text>
                    
                    <View style={styles.textRow}>
                        <Icon name="checkbox" type="Foundation" style={{color:"#BBB"}} />
                        <Text style={styles.textApp}>Inclusão das pesquisas Salvas nos Filtros </Text>
                    </View>

                    <Text style={styles.textAppNotes}>Versões Anteriores:</Text>
                    <Accordion
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                    />
                    
                </View>
            </Content>
            

            

        
        </Container>
    )
}

Sobre.navigationOptions = (props) => {
    return{
        headerMode:'screen',
        headerTitle: "Sobre o App"
    }
};

export default Sobre;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    logoImageApp: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10, 
        marginBottom: 10
    },
    textAppTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue",
        textAlign: "center",
    },
    textAppVersion:{
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
        textAlign: "center",
    },
    containerAppNotes:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#DDD",
        backgroundColor: "#fafafa",
        padding: 10,
        margin: 30
    },
    textAppNotes:{
        marginBottom:10,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    textApp:{
        maxWidth: 260,
        marginLeft: 5,
        marginBottom: 8,
        fontSize: 16,
        color: "#999",
    },
    textRow:{
        flexDirection:"row"
    },
    backContent:{
        flexDirection:"row",
        backgroundColor: "#E3EFFA",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
})