import React, { Component } from 'react';
import { Container, Header, Content, Icon } from 'native-base';
import { StyleSheet } from 'react-native'

export default class Pagina2 extends Component {
    static navigationOptions = {
        title: "Pagina 2"
    };
    render() {
        return (
            <Container>
                <Header />
                <Content>
                <Icon name='home' />
                <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
                <Icon type="FontAwesome" name="home" />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({})

