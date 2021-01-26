import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';

function Login({ history }: any) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState('');

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (username && password) {
			chatHttp
				.login({ username, password })
				.then(({ authorization, data }) => {
					console.log(data);
					setErrorMsg('');
					localStorage.setItem('AUTH', authorization);
					localStorage.setItem('username', data.username);
					history.push('/room');
				})
				.catch(({ response }) => {
					console.log(response.data);
					setErrorMsg(response.data.message);
				});
		}
	};

	useEffect(
		() => {
			const token = localStorage.getItem('AUTH');
			const username = localStorage.getItem('username');
			if (token && username) {
				chatHttp.changeLoginStatus({ newValue: true });
				history.push('/room');
			}
		},
		[ history ]
	);

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
				{errorMsg && <strong className="error__msg">{errorMsg}</strong>}
			</div>
		</div>
	);
}

export default Login;
