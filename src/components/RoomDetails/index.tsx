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

	const handleModalClose = (willProceed: boolean) => {
		setIsOpen(false);
		if (willProceed) {
			if (type === 'Leave') {
				leaveChatRoom();
			} else {
				deleteChatRoom();
			}
		}
	};

	const leaveChatRoom = () => {
		chatHttp
			.leaveRoom({ roomCode: code })
			.then((res) => {
				console.log(res);
				onRoomLeave(code);
			})
			.catch(({ response }) => {
				console.log(response.data);
			});
	};

	const deleteChatRoom = () => {
		chatHttp
			.deleteRoom({ roomCode: code })
			.then((res) => {
				console.log(res);
				// TODO open alert
				// onRoomLeave(code);
			})
			.catch(({ response }) => {
				console.log(response.data);
			});
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
				<tbody>
					{users.map(({ firstName, lastName, username }: any) => {
						return (
							<tr key={username}>
								<td>{`${firstName} ${lastName}`}</td>
								<td>{username}</td>
							</tr>
						);
					})}
				</tbody>
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
