import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import NewRoom from '../NewRoom';
import chatHttp from '../../services/Http';
import RoomDetails from '../RoomDetails';
import { useChat } from '../../context/ChatContext';
import GeneralSnackbar from '../GeneralSnackbar';

const Room = ({ history }: any) => {
	// TODO create ROOM interface
	const username = localStorage.getItem('chat-app-username');
	const [ openModal, setOpenModal ] = useState(false);
	const [ openSnackbar, setOpenSnackbar ] = useState(false);
	const snackbarMsg = useRef('');
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

	useEffect(
		() => {
			if (chatSocket === null) return;
			console.log('On Room Deleted Observable..');
			const subscription = chatSocket.onRoomDelete().subscribe((deletedRoom: string) => {
				snackbarMsg.current = `Room ${deletedRoom} has been deleted.`;
				setOpenSnackbar(true);
				if (roomCode === deletedRoom) setRoomCode((roomCode) => '');
				setRooms((prevRooms: any) => prevRooms.filter((room: any) => room.code !== deletedRoom));
			});
			return () => {
				console.log('On Room Deleted Observable Cleanup..');
				subscription.unsubscribe();
			};
		},
		[ chatSocket, roomCode ]
	);

	useEffect(
		() => {
			if (chatSocket === null) return;
			console.log('On Join Observable..');
			const subscription = chatSocket.onJoin().subscribe((userDetails: any) => {
				console.log(userDetails);
				// TODO fix
				// setRooms((prevRooms: any) => {
				// 	const userIndex = prevRooms.indexOf((room: any) => room.code === roomCode);
				// 	prevRooms[userIndex].users.push(userDetails);
				// 	return prevRooms;
				// });
			});
			return () => {
				console.log('On Join Observable Cleanup..');
				subscription.unsubscribe();
			};
		},
		[ chatSocket, roomCode ]
	);

	const getCurrentRoom = () => {
		return rooms.find((room: any) => {
			return room.code === roomCode;
		});
	};

	const handleRoomLeave = (code: string) => {
		setRoomCode('');
		setRooms(rooms.filter((room: any) => room.code !== code));
		chatSocket.leave({ name: username || '', room: code });
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

	const handleSnackbarClose = (room: any) => {
		setOpenSnackbar(false);
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
					<RoomDetails
						roomDetails={getCurrentRoom()}
						onRoomLeave={handleRoomLeave}
						chatSocket={chatSocket}
						username={username}
					/>
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
			<GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} onClose={handleSnackbarClose} />
		</div>
	);
};

export default Room;
