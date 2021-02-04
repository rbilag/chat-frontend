import React, { useState, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Button } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';
import { useHistory } from 'react-router-dom';

export interface SignUpProps {
	history: ReturnType<typeof useHistory>;
}

function SignUp({ history }: SignUpProps) {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ isAvailable, setIsAvailable ] = useState({ email: true, username: true });
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [ errorMsg, setErrorMsg ] = useState('');

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (canProceed() && firstNameRef.current && passwordRef.current) {
			setErrorMsg('');
			chatHttp
				.register({
					username,
					firstName: firstNameRef.current.value,
					lastName: lastNameRef.current ? lastNameRef.current.value : '',
					email,
					password: passwordRef.current.value
				})
				.then(({ success }) => {
					if (success) history.push('/login');
				})
				.catch(({ response }) => {
					console.log(response.data);
				});
		} else {
			setErrorMsg('Fill-in all required fields');
		}
	};

	const checkAvailability = async (value: string, type: string) => {
		if (type === 'email') setEmail(value);
		else setUsername(value);
		chatHttp
			.checkAvailability({ value, type })
			.then((resp) => {
				if (type === 'email') setIsAvailable({ ...isAvailable, email: resp.isAvailable });
				else setIsAvailable({ ...isAvailable, username: resp.isAvailable });
			})
			.catch(({ response }) => {
				console.log(response.data);
			});
	};

	const canProceed = () => {
		return (
			username &&
			email &&
			isAvailable.email &&
			isAvailable.username &&
			firstNameRef.current &&
			passwordRef.current &&
			passwordRef.current.value &&
			firstNameRef.current.value
		);
	};

	return (
		<div className="signup auth__wrapper">
			<div className="signup__area area__wrapper">
				<form>
					<DebounceInput
						debounceTimeout={300}
						onChange={(e) => checkAvailability(e.target.value, 'email')}
						value={email}
						type="text"
						placeholder="Email"
						required
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
						required
					/>
					{username &&
					!isAvailable.username && (
						<strong className="error__msg">{username} already taken, please try another username.</strong>
					)}
					<input ref={passwordRef} type="password" placeholder="Password" required />
					<div className="signup__name">
						<input ref={firstNameRef} type="text" placeholder="First Name" required />
						<input ref={lastNameRef} type="text" placeholder="Last Name" />
					</div>

					<Button
						onClick={proceed}
						type="submit"
						className="secondary"
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

export default SignUp;
