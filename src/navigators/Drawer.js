import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screes/Home';

const Drawer = createDrawerNavigator({
    Home:{
        screen:Home
    }
});

export default Drawer;