import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from '../../services/Axios';
import './style.css';

function SignUp({ history }: any) {
	const [ username, setUsername ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (username && firstName && email && password) {
			let { data } = await axios.post('/api/v1/users', { username, firstName, lastName, email, password });
			console.log(data);
			history.push('/login');
		}
	};

	return (
		<div className="signup">
			<div className="signup__area">
				<form>
					<input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
					<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
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
						className="lobby__button lobby__button--submit"
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

export default SignUp;
