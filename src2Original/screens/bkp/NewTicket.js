import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {    Container, 
            Header, 
            Left, 
            Body, 
            Title, 
            Content, 
            Icon, 
            Form, 
            Picker, 
            Item, 
            Footer, 
            FooterTab, 
            Button, 
            Text, 
            Label,
            Input,
            Textarea,
        } from 'native-base';

export default class NewTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          selected2: undefined
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onValueChange2 = this.onValueChange2.bind(this);
      }
      
      onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }
      onValueChange2(value: string) {
        this.setState({
          selected2: value
        });
      }

    render() {
        return (
            <Container>
                <Header  style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Abrir Novo Chamado</Title>
                    </Body>
                </Header>
                <Content>
                <Form style={styles.form}>

                    <Item picker style={styles.itemPicker}>
                        <Label style={styles.itemLabelPicker}>Entidade: </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Tipo do Chamado"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Entidade 1" value="key0" />
                            <Picker.Item label="incidente" value="key1" />
                        </Picker>
                    </Item>

                    <Item picker style={styles.itemPicker}>
                        <Label style={styles.itemLabelPicker}>Grupo: </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Tipo do Chamado"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Entidade 1" value="key0" />
                            <Picker.Item label="incidente" value="key1" />
                        </Picker>
                    </Item>

                    <Item picker style={styles.itemPicker}>
                        <Label style={styles.itemLabelPicker}>Requerente: </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Tipo do Chamado"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Entidade 1" value="key0" />
                            <Picker.Item label="incidente" value="key1" />
                        </Picker>
                    </Item>

                    <Item picker style={styles.itemPicker}>
                        <Label style={styles.itemLabelPicker}>Atribuido: </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Tipo do Chamado"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Entidade 1" value="key0" />
                            <Picker.Item label="incidente" value="key1" />
                        </Picker>
                    </Item>

                    <Item picker style={styles.itemPicker}>
                        <Label style={styles.itemLabelPicker}>Tipo: </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Tipo do Chamado"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Entidade 1" value="key0" />
                            <Picker.Item label="incidente" value="key1" />
                        </Picker>
                    </Item>

                    <Item picker style={styles.itemPicker}>
                        <Label style={styles.itemLabelPicker}>Categoria: </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Tipo do Chamado"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item color="red" label="Entidade 1" value="key0" />
                            <Picker.Item label="incidente" value="key1" />
                        </Picker>
                    </Item>

                    
                    
                    <Item floatingLabel last style={styles.item}>
                        <Label style={styles.itemLabel}>Titulo do Chamado 2</Label>
                        <Input />
                    </Item>
                    <View style={styles.item}>
                        <Text style={styles.textArea}>Descrição do chamado</Text>
                        <Textarea rowSpan={8} />
                    </View>
                    
                    

                    <Button block style={styles.ticketButton} >
                        <Text>Enviar</Text>
                    </Button>
                </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => {this.props.navigation.navigate('Info')}}>
                            <Icon name="info" type="Feather" />
                            <Text>Info</Text>
                        </Button>
                        <Button vertical onPress={() => {this.props.navigation.navigate('Home')}}>
                            <Icon active name="list" type="Feather" />
                            <Text>Chamados</Text>
                        </Button>
                        <Button vertical active onPress={() => {this.props.navigation.navigate('NewTicket')}}>
                            <Icon name="file-plus" type="Feather" />
                            <Text>Abrir Chamado</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    ticketButton: {
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "#184782",

    },
    header: {
        backgroundColor: "#184782",
    },
    form:{
        padding: 10,
    },
    item: {
        marginVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: "#EEEEEE",
        minHeight: 60,
        borderRadius: 4,
    },
    itemPicker: {
        marginVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: "#EEEEEE",
        minHeight: 40,
        borderRadius: 4,
    },
    itemLabelPicker: {
        color: "green",
        marginLeft: 5
    },
    textArea:{
        color: "#777777",
    }


})
