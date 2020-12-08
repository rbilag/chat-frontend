import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9000',
});

export default instance;
