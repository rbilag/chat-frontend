import React, { useEffect, useState } from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import NewRoom from '../NewRoom';
import axios from '../../services/Axios';

const Room = () => {
	// TODO create ROOM interface
	const username = sessionStorage.getItem('username');
	const roomCode = sessionStorage.getItem('room_code');
	const AUTH_TOKEN = sessionStorage.getItem('AUTH');
	const [ open, setOpen ] = useState(false);
	let [ rooms, setRooms ] = useState([]);

	useEffect(
		() => {
			getRooms(AUTH_TOKEN!);
		},
		[ AUTH_TOKEN ]
	);

	const getRooms = (token: String) => {
		axios
			.get('/api/v1/rooms', {
				headers: {
					Authorization: `Basic ${token}`
				}
			})
			.then(({ data }) => {
				console.log(data);
				setRooms(data.data.rooms);
			});
	};

	return (
		<div className="room">
			<Sidebar onNewRoom={() => setOpen(true)} rooms={rooms} />
			{roomCode ? (
				<Chat name={username!} room={roomCode!} />
			) : (
				<div className="chat chat--no-room">
					<div className="chat__header" />
					<div className="chat__body">
						<p>Create or Join a room to start a conversation!</p>
					</div>
				</div>
			)}
			<NewRoom
				open={open}
				onClose={(room: never) => {
					if (room) {
						setRooms([ ...rooms, room ]);
					}
					// getRooms(AUTH_TOKEN!);
					setOpen(false);
				}}
			/>
		</div>
	);
};

export default Room;
