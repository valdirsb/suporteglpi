import React, { Component } from 'react';
import api from '../../services/api';

import { View, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

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
  ListItem,
  List,
} from "native-base";

export default class TabOne extends Component {

    state = {
        info: [],
    };

    componentDidMount(){
        this.loadTickets();
    }

    loadTickets = async () => {
        const response = await api.get("/Ticket/?session_token=sfpjdm6jmc8si42ul07vj86ss1");

        const info = response.data;

        this.setState({ 
            
            info,
            
        });
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity style={styles.productButton} onPress={() => {this.props.navigation.navigate('DetailsScreen')}}>
                <Text style={styles.ticketEntidade}>Entidade</Text>
                <Text style={styles.ticketTitle}>{item.name}</Text>
                <View style={styles.ticketDate}><Text style={styles.ticketDateText}>{item.date}</Text></View>
            </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <Container>
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.info}
                        keyExtractor={item => String(item.id) }
                        renderItem={this.renderItem}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20,
    },

    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },

    ticketTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },

    ticketEntidade: {
        fontSize: 12,
        color: "#999",
    },

    ticketDate: {
        width: 110,
        padding: 4,
        backgroundColor: "#666",
        borderRadius: 5,
        borderColor: "#184782",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 10,
    },
    ticketDateText:{
        fontSize: 10,
        color: "#fff",
    },

    productButtonText: {
        fontSize: 16,
        color: "#184782",
        fontWeight: "bold"
    },

});
