import React, { useState } from 'react';
import './style.css';
import { parseISO, format } from 'date-fns';
import { Button } from '@material-ui/core';
import ConfirmationDialog from '../ConfirmationDialog';
import chatHttp from '../../services/Http';

function RoomDetails({ roomDetails, onRoomLeave, username }: any) {
	const { code, description, createdAt, users } = roomDetails;
	const [ isOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ type, setType ] = useState('Leave');

	const openDialog = (type: string) => {
		setIsOpen(true);
		setType(type);
		if (type === 'Leave') {
			setContent(
				'You will not be able to receive messeges sent in this room anymore. Other users in the room will also be notified when you leave.'
			);
		} else {
			setContent('You will not be able to revert this deletion.');
		}
	};

	const handleModalClose = async (willProceed: boolean) => {
		try {
			setIsOpen(false);
			if (willProceed) {
				if (type === 'Leave') {
					await chatHttp.leaveRoom({ roomCode: code });
					onRoomLeave(code);
				} else {
					await chatHttp.deleteRoom({ roomCode: code });
				}
			}
		} catch (e) {
			console.log(e.response.data);
		}
	};

	const generateUserList = () => {
		return users.map(({ firstName, lastName, username }: any) => (
			<tr key={username}>
				<td>{`${firstName} ${lastName}`}</td>
				<td>{username}</td>
			</tr>
		));
	};

	return (
		<div className="room-details">
			<h1>{code}</h1>
			<p>{description}</p>
			<p>
				<i>Created last {format(parseISO(createdAt), 'EEE MMM d h:m b')}</i>{' '}
			</p>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>{generateUserList()}</tbody>
			</table>

			<Button
				onClick={() => openDialog('Leave')}
				type="button"
				className="login__button login__button--signin"
				variant="contained"
				color="secondary"
				size="large"
			>
				Leave Room
			</Button>

			{users[0].username === username && (
				<Button
					onClick={() => openDialog('Delete')}
					type="button"
					className="login__button login__button--signin"
					variant="contained"
					color="secondary"
					size="large"
				>
					Delete Room
				</Button>
			)}

			<ConfirmationDialog open={isOpen} onClose={handleModalClose} content={content} />
		</div>
	);
}

export default RoomDetails;
