import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker, TextInput } from 'react-native'

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            servico:0,
            servicos: [
                {nome: 'item 1', valor: 10},
                {nome: 'item 2', valor: 20},
                {nome: 'item 3', valor: 30},
                {nome: 'item 4', valor: 40},
                {nome: 'item 5', valor: 50},
                {nome: 'item 6', valor: 60},
            ]
        };
    }

    render() {

        let servicosItems = this.state.servicos.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.nome} />
        });

        return (
            <View style={styles.conteiner}>
                <View style={styles.row}>
                    <View style={styles.backText}>
                        <Text style={styles.text}>Entidade: </Text>
                    </View>
                    <View style={styles.backEnt}>
                        <Picker selectedValue={this.state.servico} onValueChange={(itemValue, itemIndex) => this.setState({servico:itemValue})} >
                            {servicosItems}
                        </Picker>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.text2}>Requerente:</Text>
                        <View style={styles.back}>
                            <Picker  selectedValue={this.state.servico} onValueChange={(itemValue, itemIndex) => this.setState({servico:itemValue})} >
                                {servicosItems}
                            </Picker>
                        </View>
                        
                    </View>
                    <View>
                        <Text style={styles.text2}>Atribuído:</Text>
                        <View style={styles.back}>
                            <Picker  selectedValue={this.state.servico} onValueChange={(itemValue, itemIndex) => this.setState({servico:itemValue})} >
                                {servicosItems}
                            </Picker>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.text2}>Tipo:</Text>
                        <View style={styles.back}>
                            <Picker  selectedValue={this.state.servico} onValueChange={(itemValue, itemIndex) => this.setState({servico:itemValue})} >
                                {servicosItems}
                            </Picker>
                        </View>
                        
                    </View>
                    <View>
                        <Text style={styles.text2}>Categoria:</Text>
                        <View style={styles.back}>
                            <Picker  selectedValue={this.state.servico} onValueChange={(itemValue, itemIndex) => this.setState({servico:itemValue})} >
                                {servicosItems}
                            </Picker>
                        </View>
                        
                    </View>
                    
                </View>

                <View style={styles.column}>
                    
                    <Text style={styles.text}>Titilo do Chamado:</Text>
                    
                    <TextInput style={styles.input} />

                    <Text style={styles.text}>Descrição do Chamado:</Text>
                    
                    <TextInput numberOfLines={6} multiline style={styles.input} />

                </View>

                <View>
                    <Text>R$ {this.state.servicos[this.state.servico].valor} </Text>
                </View>
            </View>

            
            
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        padding: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    text:{
        fontSize: 20,

    },
    text2:{
        fontSize: 16,

    },
    input: {
        backgroundColor: "#EEEEEE",
    },
    back: {
        width: 160,
        height: 45,
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
    },
    backEnt:{
        width: 230,
        height: 45,
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
    },
    backText: {
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
    }
})
