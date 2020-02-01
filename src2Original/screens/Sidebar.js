import React, { Component } from 'react';
import api from '../services/api';
import { StyleSheet, StatusBar, Switch } from 'react-native';

import {
  Content,
  Text,
  ListItem,
  Container,
  Left,
  Right,
  Form,
  Item, 
  Picker,
  Radio,
  Body,
  Button,
   
} from "native-base";



export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entity:0,
      entitys: [],
      novo:true,
      process:true,
      pendente:true,
      resolvido:false,
      fechado:false
    };
  }

  componentDidMount(){
    this.loadEntitys();
  }

  loadEntitys = async () => {
      const response = await api.get('/Entity');
      const entitys = response.data;
      this.setState({ entitys });
  };


    render() {

      let entitysItems = this.state.entitys.map((v, k) => {
          return <Picker.Item key={k} value={v.completename} label={v.name} />
      });

        return (
        <Container>
            <Content>
            
            <Text style={styles.drawerTittle}>Filtros:</Text>

            <Form>
            <Item picker>
              <Picker selectedValue={this.state.entity} onValueChange={(itemValue, itemIndex) => this.setState({entity:itemValue})} >
                  {entitysItems}
              </Picker>
            </Item>
            </Form>
            <ListItem>
              <Left>
                <Text>Meus Chamados</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Chamados Atribuidos</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Todos os Chamados</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
            </ListItem>

            <Text style={styles.drawerTittle2}>Status:</Text>

            <ListItem>
              <Body>
                <Text>Novo</Text>
              </Body>
              <Switch value={this.state.novo} onValueChange={(v)=>this.setState({novo:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Processamento</Text>
              </Body>
              <Switch value={this.state.process} onValueChange={(v)=>this.setState({process:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Pendente</Text>
              </Body>
              <Switch value={this.state.pendente} onValueChange={(v)=>this.setState({pendente:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Resolvido</Text>
              </Body>
              <Switch value={this.state.resolvido} onValueChange={(v)=>this.setState({resolvido:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Fechado</Text>
              </Body>
              <Switch value={this.state.fechado} onValueChange={(v)=>this.setState({fechado:v})} />
            </ListItem>

            <Button block style={styles.buttonFilter} onPress={() => {this.props.navigation.navigate('Home', {entidade: this.state.entity ,novo: this.state.novo, process:this.state.process, pendente:this.state.pendente, resolvido:this.state.resolvido, fechado:this.state.fechado}),this.props.navigation.closeDrawer()}}>
              <Text>Filtrar</Text>
            </Button>

            
            </Content>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    
  drawerTittle: {
    padding: 10,
    color: "#FFF",
    backgroundColor: "rgb(78,122,179)",
    textAlign: "center",
    fontWeight: "bold",
  },
  drawerTittle2: {
    padding: 10,
    color: "#FFF",
    backgroundColor: "#E1E1E1",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonFilter: {
    marginHorizontal: 10,
    marginBottom: 15
  },
})

StatusBar.setBackgroundColor('#113461');
StatusBar.setBarStyle("light-content");