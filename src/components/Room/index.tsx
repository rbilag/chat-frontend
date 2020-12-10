import React from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';

const Room = () => {
	return (
		<div className="room">
			<Sidebar />
			<Chat />
		</div>
	);
};

export default Room;
