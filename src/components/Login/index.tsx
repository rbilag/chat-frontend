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
	const { userDetails, setUserDetails } = useUser();

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (usernameRef.current && usernameRef.current.value && passwordRef.current && passwordRef.current.value) {
			chatHttp
				.login({ username: usernameRef.current.value, password: passwordRef.current.value })
				.then(({ authorization, data }) => {
					setErrorMsg('');
					localStorage.setItem('chat-app-auth', authorization);
					localStorage.setItem('chat-app-user', JSON.stringify(data.userDetails));
					setUserDetails(data.userDetails);
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
			if (token && userDetails.username) {
				chatHttp.changeLoginStatus({ newValue: true });
				history.push('/room');
			}
		},
		[ history, userDetails ]
	);

	return (
		<div className="login auth__wrapper">
			<div className="login__area area__wrapper">
				<h1>REALTIME CHAT</h1>
				<p className="header__text">by Rose Bilag</p>
				<form>
					<input ref={usernameRef} type="text" placeholder="Username or Email" required />
					<input ref={passwordRef} type="password" placeholder="Password" required />
					<Button
						onClick={proceed}
						type="submit"
						variant="contained"
						color="primary"
						className="secondary"
						size="large"
					>
						Proceed
					</Button>
					<p>
						Don't have an account yet?<b className="signup__link header__text" onClick={goToSignup}>
							Register here
						</b>
					</p>
				</form>
				{errorMsg && <strong className="error__msg">{errorMsg}</strong>}
			</div>
		</div>
	);
}

export default Login;
