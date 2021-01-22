import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';

function Login({ history }: any) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (username && password) {
			let { authorization, data } = await chatHttp.login({ username, password });
			console.log(data);
			sessionStorage.setItem('AUTH', authorization);
			sessionStorage.setItem('username', data.username);
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
