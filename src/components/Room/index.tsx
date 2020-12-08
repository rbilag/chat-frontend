import React, { useState } from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';

const Room = () => {
	const [ messages, setMessages ] = useState([]);
	return (
		<div className="room">
			<Sidebar />
			<Chat messages={messages} />
		</div>
	);
};

export default Room;
