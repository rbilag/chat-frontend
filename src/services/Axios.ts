import axios from 'axios';

const instance = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`
});

instance.interceptors.request.use((req) => {
	console.log(`${req.method} ${req.url}`);
	if (req.url !== '/register' && req.url !== '/login') {
		req.headers = { ...req.headers, Authorization: `Basic ${localStorage.getItem('chat-app-auth')}` };
	}
	return req;
});

export default instance;
