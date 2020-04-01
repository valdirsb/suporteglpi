import { createSwitchNavigator } from 'react-navigation';
import Login from '../login';
import HomeStack from './HomeStack';

const MainNavigator = createSwitchNavigator({
    Login:{
        screen:Login
    },
    HomeStack:{
        screen:HomeStack
    }
});

export default MainNavigator;