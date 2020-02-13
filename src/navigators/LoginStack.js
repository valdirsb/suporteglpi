import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screes/Login';
import LoginConfig from '../screes/LoginConfig';

const MainNavigator = createStackNavigator({
    Login:{
        screen:Login
    },
    LoginConfig:{
        screen:LoginConfig
    }
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#191CBC'
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center'
    }
});

export default MainNavigator;