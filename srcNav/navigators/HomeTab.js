import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Tab1Stack from './Tab1Stack';
import Tab2Stack from './Tab2Stack';
import Tab3Stack from './Tab3Stack';
import CustomTabBar from '../components/CustomTabBar';

const HomeTab = createBottomTabNavigator({
    Tab1Stack:{
        screen:Tab1Stack
    },
    Tab2Stack:{
        screen:Tab2Stack
    },
    Tab3Stack:{
        screen:Tab3Stack
    },
},  {
    tabBarComponent:(props)=>(
        <CustomTabBar 
            {...props}
            items={[
                {text:'Chamados', route:'Tab1Stack', icon:'md-apps'},
                {text:'Info', route:'Tab2Stack', icon:'md-camera'},
                {text:'Abrir Chamado', route:'Tab3Stack', icon:'md-navigate'}
            ]}
        
        />
    )
});

export default HomeTab;