import React from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';

const Room = () => {
	const nickname = sessionStorage.getItem('nickname');
	const roomCode = sessionStorage.getItem('room_code');
	return (
		<div className="room">
			<Sidebar />
			<Chat name={nickname!} room={roomCode!} />
		</div>
	);
};

export default Room;
