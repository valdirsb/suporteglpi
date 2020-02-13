import { createSwitchNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
import LoginStack from './LoginStack';
import HomeTab from './HomeTab';

StatusBar.setBackgroundColor('#07098C');
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