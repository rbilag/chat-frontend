import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080/api/v1'
});

instance.interceptors.request.use((req) => {
	console.log(`${req.method} ${req.url}`);
	if (req.url !== '/register' && req.url !== '/login') {
		req.headers = { ...req.headers, Authorization: `Basic ${sessionStorage.getItem('AUTH')}` };
	}
	return req;
});

export default instance;
