import axios from './Axios';

const checkAvailability = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/users/checkAvailability', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const register = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/register', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const login = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/login', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const changeLoginStatus = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/users/changeStatus', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const createRoom = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/new', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const joinRoom = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/join', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const leaveRoom = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/leave', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const getRooms = async () => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.get('/rooms');
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const deleteRoom = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/delete', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const getMessages = async (data: any) => {
	return new Promise<any>(async (resolve, reject) => {
		try {
			const response = await axios.post('/messages', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const chatHttp = {
	checkAvailability,
	changeLoginStatus,
	register,
	login,
	createRoom,
	joinRoom,
	leaveRoom,
	getRooms,
	getMessages,
	deleteRoom
};

export default chatHttp;
