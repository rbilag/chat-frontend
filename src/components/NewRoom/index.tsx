import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import chatHttp from '../../services/Http';
import './style.css';
import { useChat } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';
import { RoomPopulated } from '../../types';

export interface NewRoomProps {
	open: boolean;
	onClose: (value: null | RoomPopulated) => void;
}

function NewRoom({ open, onClose }: NewRoomProps) {
	const [ isNew, setisNew ] = useState(true);
	const [ description, setDescription ] = useState('');
	const [ roomCode, setRoomCode ] = useState('');
	const chatSocket = useChat();
	const { userDetails } = useUser();

	const handleClose = (val: null | RoomPopulated) => {
		onClose(val);
	};

	const proceed = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (isNew || (!isNew && roomCode)) {
			try {
				let { data } = isNew ? await chatHttp.createRoom({ description }) : await chatHttp.joinRoom({ roomCode });
				if (data) {
					chatSocket.join({ name: userDetails.username, room: data.room.code }, true);
					setisNew(true);
					setDescription('');
					setRoomCode('');
					handleClose(data.room);
				}
			} catch (e) {
				console.log(e.response.data);
			}
		}
	};

	return (
		<Dialog onClose={() => handleClose(null)} aria-labelledby="new-room-dialog" open={open} className="newRoom">
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
						className="secondary"
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
