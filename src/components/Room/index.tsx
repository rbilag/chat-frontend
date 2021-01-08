import React from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import NewRoom from '../NewRoom';

const Room = () => {
	const username = sessionStorage.getItem('username');
	const roomCode = sessionStorage.getItem('room_code');
	const [ open, setOpen ] = React.useState(false);

	return (
		<div className="room">
			<Sidebar onNewRoom={() => setOpen(true)} />
			{roomCode ? <Chat name={username!} room={roomCode!} /> : <p>Create or Join a room to start a conversation!</p>}
			<NewRoom open={open} onClose={() => setOpen(false)} />
		</div>
	);
};

export default Room;
