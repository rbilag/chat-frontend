import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogTitle } from '@material-ui/core';
import axios from '../../services/Axios';
import './style.css';

function NewRoom({ history, onClose, open }: any) {
	const [ isNew, setisNew ] = useState(true);
	const [ roomCode, setRoomCode ] = useState('');

	const handleClose = () => {
		onClose();
	};

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		console.log('PROCEED');
		// if (!isNew || (isNew && roomCode)) {
		// 	let { data } = isNew
		// 		? await axios.post('/api/v1/rooms/new', { nickname })
		// 		: await axios.post('/api/v1/rooms/join', { nickname, roomCode });
		// 	sessionStorage.setItem('nickname', nickname);
		// 	sessionStorage.setItem('room_code', data.data.room.code);
		// 	history.push('/room');
		// }
	};

	return (
		<div className="newRoom">
			<Dialog onClose={handleClose} aria-labelledby="new-room-dialog" open={open}>
				<DialogTitle id="new-room-dialog">New Room</DialogTitle>
				<form>
					<ButtonGroup className="newRoom__type" color="primary">
						<Button
							onClick={() => setisNew(true)}
							className={`newRoom__button ${isNew && 'newRoom__button--selected'}`}
						>
							Create Room
						</Button>
						<Button
							onClick={() => setisNew(false)}
							className={`newRoom__button ${!isNew && 'newRoom__button--selected'}`}
						>
							Join Room
						</Button>
					</ButtonGroup>

					{!isNew && (
						<input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} type="text" placeholder="Room Code" />
					)}

					<Button
						onClick={proceed}
						type="submit"
						className="newRoom__button newRoom__button--submit"
						variant="contained"
						color="primary"
						size="large"
					>
						Proceed
					</Button>
				</form>
			</Dialog>
		</div>
	);
}

export default NewRoom;
