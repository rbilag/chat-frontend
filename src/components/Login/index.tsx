import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';
import { useUser } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

export interface LoginProps {
	history: ReturnType<typeof useHistory>;
}
function Login({ history }: LoginProps) {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [ errorMsg, setErrorMsg ] = useState('');
	const [ user, setUser ] = useUser();

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (usernameRef.current && usernameRef.current.value && passwordRef.current && passwordRef.current.value) {
			chatHttp
				.login({ username: usernameRef.current.value, password: passwordRef.current.value })
				.then(({ authorization, data }) => {
					setErrorMsg('');
					localStorage.setItem('chat-app-auth', authorization);
					console.log(data);
					setUser(data.userDetails);
					history.push('/room');
				})
				.catch(({ response }) => {
					console.log(response.data);
					setErrorMsg(response.data.message);
				});
		} else {
			setErrorMsg('Fill-in both username and password');
		}
	};

	const goToSignup = async () => {
		history.push('/signup');
	};

	useEffect(() => {
		if (usernameRef.current) usernameRef.current.focus();
	}, []);

	useEffect(
		() => {
			const token = localStorage.getItem('chat-app-auth');
			if (token && user.username) {
				chatHttp.changeLoginStatus({ newValue: true });
				history.push('/room');
			}
		},
		[ history, user ]
	);

	return (
		<div className="login">
			<div className="login__area">
				<form>
					<input ref={usernameRef} type="text" placeholder="Username or Email" required />
					<input ref={passwordRef} type="password" placeholder="Password" required />
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
					<Button
						onClick={goToSignup}
						type="button"
						className="login__button login__button--signin"
						variant="contained"
						color="secondary"
						size="large"
					>
						Register
					</Button>
				</form>
				{errorMsg && <strong className="error__msg">{errorMsg}</strong>}
			</div>
		</div>
	);
}

export default Login;
