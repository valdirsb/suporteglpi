import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screes/Home';
import Ticket from '../screes/Ticket';
import TicketProcess from '../screes/TicketProcess';
import Drawer from '../navigators/Drawer';
import { Header } from 'native-base';

const Tab1Stack = createStackNavigator({
    Drawer:{
        screen:Drawer
    },
    Ticket:{
        screen:Ticket
    },
    TicketProcess:{
        screen:TicketProcess
    },
}, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#191CBC'
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center'
    }
});

export default Tab1Stack;