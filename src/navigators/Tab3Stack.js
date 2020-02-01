import { createStackNavigator } from 'react-navigation-stack';
import NewTicket from '../screes/NewTicket';

const Tab3Stack = createStackNavigator({
    NewTicket:{
        screen:NewTicket
    }
});

export default Tab3Stack;