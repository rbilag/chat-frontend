import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import axios from '../../services/Axios';
import './style.css';

const Lobby = ({ history }: any) => {
	const [ isNew, setisNew ] = useState(true);
	const [ nickname, setNickname ] = useState('');
	const [ roomCode, setRoomCode ] = useState('');

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (nickname && (!isNew || (isNew && roomCode))) {
			let { data } = isNew
				? await axios.post('/api/v1/rooms/new', { nickname })
				: await axios.post('/api/v1/rooms/join', { nickname, roomCode });
			sessionStorage.setItem('nickname', nickname);
			sessionStorage.setItem('room_code', data.data.room.code);
			history.push('/room');
		}
	};

	return (
		<div className="lobby">
			<div className="lobby__content">
				<form>
					<ButtonGroup className="lobby__type" color="primary" aria-label="outlined primary button group">
						<Button onClick={() => setisNew(true)} className={`lobby__button ${isNew && 'lobby__button--selected'}`}>
							Create Room
						</Button>
						<Button onClick={() => setisNew(false)} className={`lobby__button ${!isNew && 'lobby__button--selected'}`}>
							Join Room
						</Button>
					</ButtonGroup>

					<input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text" placeholder="Nickname" />
					{!isNew && (
						<input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} type="text" placeholder="Room Code" />
					)}

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
};

export default Lobby;
