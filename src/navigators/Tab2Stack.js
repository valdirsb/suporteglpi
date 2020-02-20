import { createStackNavigator } from 'react-navigation-stack';
import Sobre from '../screes/Sobre';
import Config from '../screes/Config';
import Outro from '../screes/Outro';

const Tab2Stack = createStackNavigator({
    Sobre:{
        screen:Sobre
    },
    Config:{
        screen:Config
    },
    Outro:{
        screen:Outro
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

export default Tab2Stack;