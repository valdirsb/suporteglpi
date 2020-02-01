import React from 'react';
import {Root} from 'native-base';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

StatusBar.setBackgroundColor('#113461');
StatusBar.setBarStyle("light-content");

//Screens
import LoginScreen from './screens/Login';
import LoginConfigScreen from './screens/LoginConfig';
import HomeScreen from './screens/Home';
import TicketScreen from './screens/Ticket';
import TicketProcessScreen from './screens/TicketProcess';
import InfoScreen from './screens/Info';
import NewTicketScreen from './screens/NewTicket';
import SideBar from "./screens/Sidebar";


const Drawer = createDrawerNavigator({
  Home: HomeScreen
},
{
  initialRouteName: "Home",
  drawerPosition: "right",
  contentComponent: props => <SideBar {...props} />
});

const AppStack = createStackNavigator({
  
    Drawer: Drawer,
    Ticket: TicketScreen,
    TicketProcess: TicketProcessScreen, 
    Info: InfoScreen,
    NewTicket: NewTicketScreen
     
    },{
        initialRouteName: "Drawer",
        headerMode: "none",
    });



const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Lconfig: LoginConfigScreen
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#184782"
            },
            headerTintColor: "#FFF"
        },
});


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
)
);

export default () =>
  <Root>
    <AppContainer />
  </Root>;