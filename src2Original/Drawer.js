import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

//screens
import App from './screens/Home';

const Drawer = createDrawerNavigator({
    App:{
        screen: App
    }
});

export default Drawer;