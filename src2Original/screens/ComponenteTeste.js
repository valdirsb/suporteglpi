import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Contrast , TextRed} from './Componentes'

export default class ComponenteTeste extends Component {
    render() {
        return (
            <View>
                <Contrast icon='!' color='#F58634'>Texto aqui</Contrast>
                <TextRed>Texto vermelho</TextRed>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
