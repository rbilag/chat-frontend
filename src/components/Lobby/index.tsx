import React, { useState } from 'react';
import axios from '../../services/Axios';
import './style.css';

const Lobby = ({ history }: any) => {
	const [ isNew, setisNew ] = useState(true);
	const [ nickname, setNickname ] = useState('');
	const [ roomCode, setRoomCode ] = useState('');

	const proceed = () => {
		if (isNew) {
			// axios.post('/api/v1/rooms/new', { nickname }).then((res) => {
			//   console.log(res);
			//   // redirect to room page or show error
			// });
		} else {
			// check if room exists
			// check if no nickname dup in room
			// axios.post('/api/v1/rooms/join', { nickname, roomCode }).then((res) => {
			//   console.log(res);
			//   // redirect to room page or show error
			// });
		}
		history.push('/room');
	};

	return (
		<div className="lobby">
			<div className="lobby__form">
				<form>
					<button className="lobby__button lobby__button--selected" onClick={() => setisNew(true)} type="button">
						Create Room
					</button>
					<button className="lobby__button" onClick={() => setisNew(false)} type="button">
						Join Room
					</button>

					<input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text" placeholder="Nickname" />
					{isNew && (
						<input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} type="text" placeholder="Room Code" />
					)}

					<button className="lobby__button lobby__button--submit" onClick={proceed} type="submit">
						Proceed
					</button>
				</form>
			</div>
		</div>
	);
};

export default Lobby;
