import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL: 'http://grupofst.com.br/hb7ti/apirest.php'
})

api.interceptors.request.use(async (config) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      
      if (token) {
        config.headers = {
            'Session-Token': token,
            'Content-Type': 'application/json'
        };
      }
  
      return config;
    } catch (err) {
      alert(err);
    }
  });



export default api;