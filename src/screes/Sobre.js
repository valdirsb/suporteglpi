import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Container, Icon, Content } from 'native-base';


const logoImageApp = require("../assets/ic_launcher_round.png");

const Sobre = (props) => {
    return(
        <Container style={styles.container}>
            <Content>
                <View style={styles.logoImageApp}>
                    <Image source={logoImageApp} />
                </View>
                
                <Text style={styles.textAppTitle}>SUPORTE FST</Text>
                <Text style={styles.textAppVersion}>Versão 0.5</Text>

                <View style={styles.containerAppNotes}>
                    
                    <Text style={styles.textAppNotes}>Notas da Versão:</Text>

                    <View style={styles.textRow}>
                        <Icon name="checkbox" type="Foundation" style={{color:"#BBB"}} />
                        <Text style={styles.textApp}>Correções realizadas nos filtros. </Text>
                    </View>
                    <View style={styles.textRow}>
                        <Icon name="checkbox" type="Foundation" style={{color:"#BBB"}} />
                        <Text style={styles.textApp}>Correção na exibição das informações de usuários atribuidos e requerentes. </Text>
                    </View>
                    <View style={styles.textRow}>
                        <Icon name="checkbox" type="Foundation" style={{color:"#BBB"}} />
                        <Text style={styles.textApp}>Criação da pagina "Sobre o App" com informações das notas da versão.</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Icon name="checkbox" type="Foundation" style={{color:"#BBB"}} />
                        <Text style={styles.textApp}>Alterações feita no layout do aplicativo</Text>
                    </View>
                    
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
    }
})