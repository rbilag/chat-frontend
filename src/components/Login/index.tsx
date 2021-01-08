import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from '../../services/Axios';
import './style.css';

function Login({ history }: any) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (username && password) {
			let { data } = await axios.post('/api/v1/login', { username, password });
			console.log(data);
			sessionStorage.setItem('AUTH', data.authorization);
			history.push('/room');
		}
	};

	return (
		<div className="login">
			<div className="login__area">
				<form>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Username or Email"
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<Button
						onClick={proceed}
						type="submit"
						className="login__button login__button--submit"
						variant="contained"
						color="primary"
						size="large"
					>
						Proceed
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Login;
