import { createStackNavigator } from 'react-navigation-stack';
import home from '../home';
import detalhes from '../detalhes';
import add from '../add';

const HomeStack = createStackNavigator({
    home:{
        screen:home,
    },
    detalhes:{
        screen:detalhes
    },
    add:{
        screen:add
    }
});

export default HomeStack;