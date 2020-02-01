import React from 'react';
import { Footer, FooterTab, Button, Text, Icon  } from 'native-base';

export default (props)=>{

    let tabs = props.items.map((item, index)=>{
        return (
            <Button vertical
                key={index}
                onPress={()=>props.navigation.navigate(item.route)}
                >
                <Icon type="Ionicons" name={item.icon} />
                <Text>{item.text}</Text>
            </Button>
            
        );
    });
    return (

        <Footer>
            <FooterTab>
                {tabs}
            </FooterTab>
        </Footer>
    );
}
