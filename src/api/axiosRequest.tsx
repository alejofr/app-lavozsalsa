import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosRequest = axios.create({
    //baseURL: 'http://52.44.192.46/api-salsa'
    baseURL: 'https://signatureviajes.com/api-salsa'
});

axiosRequest.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers = {
                ...config.headers,
                'Authorization' : `Bearer ${token}`,
            };
        }
        return config;
    }
);

export default axiosRequest;