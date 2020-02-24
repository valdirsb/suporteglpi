import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar } from 'react-native';
import Info from '../screes/Info';
import Config from '../screes/Config';
import Sobre from '../screes/Sobre';

StatusBar.setBackgroundColor('#0E2340');
const Tab2Stack = createStackNavigator({
    Info:{
        screen:Info,
        
    },
    Config:{
        screen:Config
    },
    Sobre:{
        screen:Sobre
    },
}, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#191CBC'
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center',
    }
});

export default Tab2Stack;