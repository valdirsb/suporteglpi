import { createStackNavigator } from 'react-navigation-stack';
import NewTicket from '../screes/NewTicket';

const Tab3Stack = createStackNavigator({
    NewTicket:{
        screen:NewTicket
    }
}, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#191CBC'
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center'
    }
});

export default Tab3Stack;