import React from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import NewRoom from '../NewRoom';

const Room = () => {
	const nickname = sessionStorage.getItem('nickname');
	const roomCode = sessionStorage.getItem('room_code');
	const [ open, setOpen ] = React.useState(false);

	return (
		<div className="room">
			<Sidebar onNewRoom={() => setOpen(true)} />
			{/* <Chat name={nickname!} room={roomCode!} /> */}
			<NewRoom open={open} onClose={() => setOpen(false)} />
		</div>
	);
};

export default Room;
