import React, { Component } from 'react'
import { Image, StyleSheet, StatusBar } from 'react-native'

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";



const drawerCover = require("../assets/fundoFst.png");
const drawerImage = require("../assets/logo-grupo-fst.png");

const datas = [
  {
    name: "Entidade 1",
    route: "ItemDrawer1",
    icon: "images",
    bg: "#DA4437"
  },
  {
    name: "Entidade 2",
    route: "ItemDrawer2",
    icon: "images",
    bg: "#DA4437",
    types: "2"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Entidade 3",
    route: "ItemDrawer3",
    icon: "images",
    bg: "#DA4437",
    types: "4"
  },
];

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        shadowOffsetWidth: 1,
        shadowRadius: 4
        };
    }

    render() {
        return (
        <Container>
            <Content
            bounces={false}
            style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
            >
            <Image source={drawerCover} style={styles.drawerCover} />
            <Image square style={styles.drawerImage} source={drawerImage} />
            <Text style={styles.drawerTittle}>Entidades:</Text>
            <List
                dataArray={datas}
                renderRow={data =>
                <ListItem
                    button
                    noBorder
                    onPress={() => this.props.navigation.navigate(data.route)}
                >
                    <Left>
                    <Icon
                        active
                        name={data.icon}
                        style={{ color: "#777", fontSize: 26, width: 30 }}
                    />
                    <Text style={styles.text}>
                        {data.name}
                    </Text>
                    </Left>
                    {data.types &&
                    <Right style={{ flex: 1 }}>
                        <Badge
                        style={{
                            borderRadius: 3,
                            height: 25,
                            width: 40,
                            backgroundColor: data.bg
                        }}
                        >
                        <Text
                            style={styles.badgeText}
                        >{`${data.types}`}</Text>
                        </Badge>
                    </Right>}
                </ListItem>}
            />
            </Content>
        </Container>
        )
    }
}

const React1 = require("react-native");
const { Platform, Dimensions } = React1 ;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 168,
    height: 93,
    resizeMode: "cover"
  },
  drawerTittle: {
    padding: 10,
    color: "#FFF",
    backgroundColor: "rgb(78,122,179)",
    textAlign: "center",
    fontWeight: "bold",
  }
})

StatusBar.setBackgroundColor('#113461');
StatusBar.setBarStyle("light-content");