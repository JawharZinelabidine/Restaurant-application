import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const customAxios = axios.create({
    baseURL: `http://${apiUrl}:3000`,
    timeout: 5000,
});



customAxios.interceptors.request.use(
    async (config) => {

        const token = await SecureStore.getItemAsync('token');

        config.headers['Authorization'] = 'Bearer' + ' ' + token

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default customAxios;