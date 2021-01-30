import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';

function NewRoom({ history, onClose, open, chatSocket, username }: any) {
	const [ isNew, setisNew ] = useState(true);
	const [ description, setDescription ] = useState('');
	const [ roomCode, setRoomCode ] = useState('');

	const handleClose = (val = false) => {
		onClose(val);
	};

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (isNew || (!isNew && roomCode)) {
			try {
				let { data } = isNew ? await chatHttp.createRoom({ description }) : await chatHttp.joinRoom({ roomCode });
				if (data) {
					console.log(data);
					chatSocket.join({ name: username, room: data.room.code }, true);
					handleClose(data.room);
				}
			} catch (e) {
				console.log(e.response.data);
			}
		}
	};

	return (
		<Dialog onClose={() => handleClose()} aria-labelledby="new-room-dialog" open={open} className="newRoom">
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

					{isNew ? (
						<textarea
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Room Description"
						/>
					) : (
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
