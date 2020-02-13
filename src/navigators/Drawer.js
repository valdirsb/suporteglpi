import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screes/Home';
import { View, Text } from 'react-native';
import { Body, Header, Title, Left, Button, Icon, Right } from 'native-base';

const Drawer = createDrawerNavigator({
    Home:{
        screen:Home
    }
}, {
    defaultNavigationOptions:{
        title:"Pagina Drawer"
        
    }
});

Drawer.navigationOptions = ({navigation}) => {
    return{
        headerLeft: ()=> <Button hasText transparent onPress={this.loadRefresh}>
                            <Icon  style={{color:"#E0FFFF"}} name="refresh" type="FontAwesome" />
                        </Button>,
        headerTitle: 'Chamados',
        headerRight: ()=> <Button hasText transparent onPress={() => navigation.toggleDrawer()}>
                            <Text style={{color:"#E0FFFF"}}>Filtros</Text>
                            <Icon  style={{color:"#E0FFFF", marginLeft:0}} name="filter" type="MaterialCommunityIcons" />
                          </Button>,
    }
};

export default Drawer;