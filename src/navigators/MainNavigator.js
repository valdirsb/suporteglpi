import { createSwitchNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
import LoginStack from './LoginStack';
import HomeTab from './HomeTab';

StatusBar.setBackgroundColor('#0E2340');
StatusBar.setBarStyle("light-content");

const MainNavigator = createSwitchNavigator({
    LoginStack:{
        screen:LoginStack
    },
    HomeTab:{
        screen:HomeTab
    }
});

export default MainNavigator;