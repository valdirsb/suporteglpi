import { createSwitchNavigator } from 'react-navigation';
import LoginStack from './LoginStack';
import HomeTab from './HomeTab';

const MainNavigator = createSwitchNavigator({
    LoginStack:{
        screen:LoginStack
    },
    HomeTab:{
        screen:HomeTab
    }
});

export default MainNavigator;