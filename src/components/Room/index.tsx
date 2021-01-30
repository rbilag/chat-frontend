import React, { useEffect, useState } from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import NewRoom from '../NewRoom';
import chatHttp from '../../services/Http';
import RoomDetails from '../RoomDetails';
import { useChat } from '../../context/ChatContext';

const Room = ({ history }: any) => {
	// TODO create ROOM interface
	const username = localStorage.getItem('chat-app-username');
	const [ openModal, setOpenModal ] = useState(false);
	const [ rooms, setRooms ]: Array<any> = useState([]);
	const [ roomCode, setRoomCode ] = useState('');
	const chatSocket = useChat();

	useEffect(
		() => {
			console.log('Initializing Socket Context..');
			chatSocket.init();
			chatHttp
				.getRooms()
				.then(({ data }) => {
					console.log(data);
					setRooms(data.rooms);
					if (data.rooms[0]) {
						setRoomCode(data.rooms[0].code);
						data.rooms.forEach((room: any) => {
							chatSocket.join({ name: username || '', room: room.code });
						});
					}
				})
				.catch(({ response }) => {
					console.log(response);
					if (response.status === 401) {
						localStorage.clear();
						history.push('/login');
					}
				});
		},
		[ history, username, chatSocket ]
	);

	const getCurrentRoom = () => {
		return rooms.find((room: any) => {
			return room.code === roomCode;
		});
	};

	// TODO room parameter can be ROOM interface or boolean
	const handleModalClose = (room: any) => {
		if (room) {
			console.log(room);
			setRooms([ ...rooms, room ]);
			setRoomCode(room.code);
		}
		setOpenModal(false);
	};

	return (
		<div className="room">
			<Sidebar
				onNewRoom={() => setOpenModal(true)}
				rooms={rooms}
				history={history}
				chatSocket={chatSocket}
				name={username!}
				room={roomCode!}
			/>
			{roomCode ? (
				<React.Fragment>
					<Chat name={username!} room={roomCode!} chatSocket={chatSocket} />
					<RoomDetails roomDetails={getCurrentRoom()} />
				</React.Fragment>
			) : (
				<div className="chat chat--no-room">
					<div className="chat__header" />
					<div className="chat__body">
						<p>Create or Join a room to start a conversation!</p>
					</div>
				</div>
			)}

			<NewRoom open={openModal} onClose={handleModalClose} chatSocket={chatSocket} username={username} />
		</div>
	);
};

export default Room;
