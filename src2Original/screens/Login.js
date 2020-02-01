import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Item, Input, Label, Spinner } from 'native-base';
import base64 from 'react-native-base64';
import api from '../services/api';

export default class Login extends Component {
    static navigationOptions = {
        title: "Suporte GrupoFST"
    };

	constructor(props) {
		super(props);
		this.state = {
			nome:'',
            senha:'',
            loading:true
        };

        this.login = this.login.bind(this);
    }

    componentDidMount(){
        this.loadToken();
    }

    loadToken = async () => {
        const token = await AsyncStorage.getItem("@token");
    
        if (token) {
            this.props.navigation.navigate('App');
        } else {
            this.setState({loading:false});
        }

    }

	login = async () => {
        
		if (this.state.nome.length === 0 || this.state.senha.length === 0){
            alert("Preencha usuário e senha")
        } else {
            this.setState({loading:true});
            const authorization = "Basic "+base64.encode(this.state.nome+":"+this.state.senha);
            
            try {
                const response = await api.get('/initSession',{
                    headers: {
                        Authorization: authorization
                    }
                });

                const token = response.data.session_token;

                AsyncStorage.setItem("@token", token);

                this.props.navigation.navigate('App');

            } catch (_err) {
                alert("Login ou senha incorretos");
            }
            this.setState({loading:false});
        }
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

		return (
				
				<View style={styles.container}>
					<View style={styles.tituloImage}>
						<Image source={require('../assets/logo-grupo-fst.png')} />
					</View>

				<View style={styles.loginContainer}>
					
                        <Item floatingLabel>
                            <Label>Usuario</Label>
                            <Input autoCapitalize='none' onChangeText={(nome)=>this.setState({nome})} value={this.state.nome} />
                        </Item>
                        <Item style={{marginTop:10}} floatingLabel>
                            <Label>Senha</Label>
                            <Input autoCapitalize='none' secureTextEntry={true} onChangeText={(senha)=>this.setState({senha})} value={this.state.senha} />
                        </Item>

                    <TouchableOpacity style={styles.loginButton} onPress={this.login}>
						<Text style={styles.loginButtonText}>Acessar</Text>
					</TouchableOpacity>
                    
				</View>
				</View>

        )
        }
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom:70,
        backgroundColor: "#fafafa",
        justifyContent: "center",
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
        marginBottom: 30,
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