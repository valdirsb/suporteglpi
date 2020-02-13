import React, { Component } from 'react';
import { Text, StyleSheet,  View } from 'react-native';

export class Contrast extends Component {
    render() {
        return(
            <View style={{
                flexDirection: 'row',
                paddingVertical: 3,
                paddingHorizontal: 10,
                backgroundColor: this.props.color,
                borderRadius: 5,
                borderColor: "#184782",
                marginTop: 10,
                alignItems: 'center',
            }}>
                <Text style={{
                    width: 20,
                    textAlign: 'center',
                    color: this.props.color,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    fontSize: 16,
                    fontWeight: 'bold',
                }}>{this.props.icon}</Text>
                <Text style={{
                    marginLeft: 6,
                    fontSize: this.props.fontSize,
                    fontWeight: 'bold',
                    color: "#fff",
                    textAlign: "center",
                }}> {this.props.children} </Text>
            </View>
        );
    }
}

export class TextRed extends Component {
    render() {
        return(
            <Text style={{color: "red"}} >{this.props.children}</Text>
        );
    }
}

