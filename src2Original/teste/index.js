import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Accordion } from "native-base";
import { Contrast , TextRed} from '../screens/Componentes'

const dataArray = [
    { title: "First Element", content: "blab bla bla" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];

export default class index extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content padder>
                <Accordion dataArray={dataArray} expanded={0}/>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({})
