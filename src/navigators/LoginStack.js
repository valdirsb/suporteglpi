import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screes/Login';
import LoginConfig from '../screes/LoginConfig';

const MainNavigator = createStackNavigator({
    Login:{
        screen:Login,
    },
    LoginConfig:{
        screen:LoginConfig
    }
},{
    headerMode:'none',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#191CBC'
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center',
        headerTitle: "Suporte FST"
    }
});

export default MainNavigator;