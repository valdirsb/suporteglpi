import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screes/Home';
import Ticket from '../screes/Ticket';
import TicketProcess from '../screes/TicketProcess';
import Drawer from '../navigators/Drawer';

const Tab1Stack = createStackNavigator({
    Drawer:{
        screen:Drawer
    },
    Ticket:{
        screen:Ticket
    },
    TicketProcess:{
        screen:TicketProcess
    },
});

export default Tab1Stack;