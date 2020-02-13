import React from 'react';
import {View, Text} from 'react-native';

const Ticket = () => {
    return(
        <View>
            <Text>Pagina Ticket</Text>
        </View>
    )
}

Ticket.navigationOptions = () => {
    return{
        headerTitle:"Chamado",
        
    }
};

export default Ticket;