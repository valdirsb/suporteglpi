import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Item, Input, Label, Spinner } from 'native-base';
import base64 from 'react-native-base64';
import api from '../services/api';

export default (props) => {

    const [ nome, setNome ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ loading, setLoading ] = useState(true);
    AsyncStorage.setItem("@token", "");

    useEffect(()=>{
        loadToken();
    },[]);
    

    loadToken = async () => {
        const token = await AsyncStorage.getItem("@token");
    
        if (token) {
            props.navigation.navigate('HomeTab');
        } else {
            setLoading(false);
        }
    }

    login = async () => {
        
		if (nome.length === 0 || senha.length === 0){
            alert("Preencha usuário e senha")
        } else {
            setLoading(true);
            const authorization = "Basic "+base64.encode(nome+":"+senha);
            
            try {
                const response = await api.get('/initSession',{
                    headers: {
                        Authorization: authorization
                    }
                });
                
                const token = response.data.session_token;

                AsyncStorage.setItem('@token', token);

                props.navigation.navigate('HomeTab');

            } catch (_err) {
                alert("Login ou senha incorretos");
            }
            setLoading(false);
        }
    };

    const ir = (r) => {
        props.navigation.navigate(r);
    }

    if(loading){
        return (
            <View style={styles.loadView}>
                <Spinner color='blue' />
                <Text>Carregando...</Text>
            </View>
            );
    } else {
        return(

            <View style={styles.container}>
                <View style={styles.tituloImage}>
                    <Image source={require('../assets/logo-grupo-fst.png')} />
                </View>

                <View style={styles.loginContainer}>
                
                        <Item floatingLabel>
                            <Label>Usuario</Label>
                            <Input autoCapitalize='none' onChangeText={n=>setNome(n)} value={nome} />
                        </Item>
                        <Item style={{marginTop:10}} floatingLabel>
                            <Label>Senha</Label>
                            <Input autoCapitalize='none' secureTextEntry={true} onChangeText={s=>setSenha(s)} value={senha} />
                        </Item>

                    <TouchableOpacity style={styles.loginButton} onPress={login}>
                        <Text style={styles.loginButtonText}>Acessar</Text>
                    </TouchableOpacity>
    
                </View>

            </View>
    
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
    },
    loadView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginHorizontal:30,
        justifyContent: "center",
        alignItems: "center",
    },
    tituloImage: {
        marginBottom: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    inputText: {
        textAlign: "center",
        fontSize: 18,
        width: 200,
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#184782",
    },
    loginButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#184782",
        backgroundColor: '#113461',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    loginButtonText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold",
        paddingHorizontal: 20,
    },
    configButton:{
        marginTop: 30,
    }

});