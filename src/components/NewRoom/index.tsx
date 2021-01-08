import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import axios from '../../services/Axios';
import './style.css';

function NewRoom({ history, onClose, open }: any) {
	const [ isNew, setisNew ] = useState(true);
	const [ roomCode, setRoomCode ] = useState('');
	const AUTH_TOKEN = sessionStorage.getItem('AUTH');

	const handleClose = () => {
		onClose();
	};

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (isNew || (!isNew && roomCode)) {
			let { data } = isNew
				? await axios.post(
						'/api/v1/rooms/new',
						{},
						{
							headers: {
								Authorization: `Basic ${AUTH_TOKEN}`
							}
						}
					)
				: await axios.post(
						'/api/v1/rooms/join',
						{ roomCode },
						{
							headers: {
								Authorization: `Basic ${AUTH_TOKEN}`
							}
						}
					);
			console.log(data);
			sessionStorage.setItem('room_code', data.data.room.code);
			handleClose();
		}
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="new-room-dialog" open={open} className="newRoom">
			<DialogTitle id="new-room-dialog">New Room</DialogTitle>
			<DialogContent className="newRoom__content">
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
			</DialogContent>
		</Dialog>
	);
}

export default NewRoom;
