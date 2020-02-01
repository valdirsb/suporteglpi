
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';

const Pag2 = () => {
    return (
      <View>
        <Text>Olá mundo!</Text>
        <Text>texto 2</Text>
        <Button
            title="Pagina 2"
            onPress={() => this.props.navigation.navigate('Home')}
          />
      </View>
    );
  }

  export default Pag2