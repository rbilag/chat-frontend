import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Button } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';

function SignUp({ history }: any) {
	const [ username, setUsername ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ isAvailable, setIsAvailable ] = useState({ email: true, username: true });
	console.log(isAvailable);

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (username && firstName && email && password && isAvailable.email && isAvailable.username) {
			let { success } = await chatHttp.register({ username, firstName, lastName, email, password });
			if (success) history.push('/login');
		}
	};

	const checkAvailability = async (value: string, type: string) => {
		if (type === 'email') setEmail(value);
		else setUsername(value);

		let resp = await chatHttp.checkAvailability({ value, type });
		if (type === 'email') setIsAvailable({ ...isAvailable, email: resp.isAvailable });
		else setIsAvailable({ ...isAvailable, username: resp.isAvailable });
	};

	return (
		<div className="signup">
			<div className="signup__area">
				<form>
					<DebounceInput
						debounceTimeout={300}
						onChange={(e) => checkAvailability(e.target.value, 'email')}
						value={email}
						type="text"
						placeholder="Email"
					/>
					{email &&
					!isAvailable.email && (
						<strong className="error__msg">{email} already taken, please try another email.</strong>
					)}
					<DebounceInput
						debounceTimeout={300}
						onChange={(e) => checkAvailability(e.target.value, 'username')}
						value={username}
						type="text"
						placeholder="Username"
					/>
					{username &&
					!isAvailable.username && (
						<strong className="error__msg">{username} already taken, please try another username.</strong>
					)}
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<div className="signup__name">
						<input
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							type="text"
							placeholder="First Name"
						/>
						<input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
					</div>

					<Button
						onClick={proceed}
						type="submit"
						className="signup__button signup__button--submit"
						variant="contained"
						color="primary"
						size="large"
						disabled={!isAvailable.email || !isAvailable.username || !username || !firstName || !email || !password}
					>
						Proceed
					</Button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
