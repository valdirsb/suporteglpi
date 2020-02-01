import React from 'react';
import {View, Text, Button} from 'react-native';

export default (props) => {

    
    const ir = (r) => {
        props.navigation.navigate(r);
    }

    return(
        <View>
            <Text>Pagina Login</Text>
            <Button title="Configurações" onPress={()=>ir("LoginConfig")} />
            <Button title="Logar" onPress={()=>ir("HomeTab")} />
        </View>
    )
}