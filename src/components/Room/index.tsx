import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import NewRoom from '../NewRoom';
import chatHttp from '../../services/Http';
import RoomDetails from '../RoomDetails';
import { useChat } from '../../context/ChatContext';
import GeneralSnackbar from '../GeneralSnackbar';
import messageAudio from '../../assets/audio/message.mp3';

const audio = new Audio(messageAudio);

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
					if (response.status === 401) {
						localStorage.clear();
						history.push('/login');
					}
				});
		},
		[ history, chatSocket, username ]
	);

	useEffect(
		() => {
			if (chatSocket === null) return;
			const joinSubscription = chatSocket.onJoin().subscribe(({ userDetails, joinedRoom }: any) => {
				setRooms((prevRooms: any) => {
					const newRooms = [ ...prevRooms ];
					const userIndex = newRooms.findIndex((room: any) => room.code === joinedRoom);
					if (userIndex >= 0) newRooms[userIndex].users.push(userDetails);
					return newRooms;
				});
			});
			const leaveSubscription = chatSocket.onLeave().subscribe(({ userDetails, leftRoom }: any) => {
				setRooms((prevRooms: any) => {
					const newRooms = [ ...prevRooms ];
					const userIndex = newRooms.findIndex((room: any) => room.code === leftRoom);
					if (userIndex >= 0) {
						newRooms[userIndex].users = newRooms[userIndex].users.filter(
							(user: any) => user.username !== userDetails.username
						);
					}
					return newRooms;
				});
			});
			return () => {
				joinSubscription.unsubscribe();
				leaveSubscription.unsubscribe();
			};
		},
		[ chatSocket ]
	);

	useEffect(
		() => {
			if (chatSocket === null) return;
			const deleteSubscription = chatSocket.onRoomDelete().subscribe((deletedRoom: string) => {
				snackbarMsg.current = `Room ${deletedRoom} has been deleted.`;
				setOpenSnackbar(true);
				if (roomCode === deletedRoom) setRoomCode((roomCode) => '');
				setRooms((prevRooms: any) => prevRooms.filter((room: any) => room.code !== deletedRoom));
			});
			const messageSubscription = chatSocket.onMessage().subscribe((message: any) => {
				if (message.roomCode !== roomCode) {
					setRooms((prevRooms: any) => {
						const newRooms = [ ...prevRooms ];
						const userIndex = newRooms.findIndex((room: any) => room.code === message.roomCode);
						if (userIndex >= 0)
							newRooms[userIndex].unread = newRooms[userIndex].unread ? ++newRooms[userIndex].unread : 1;
						return newRooms;
					});
					audio.play();
				}
			});
			return () => {
				deleteSubscription.unsubscribe();
				messageSubscription.unsubscribe();
			};
		},
		[ chatSocket, roomCode ]
	);

	const getCurrentRoom = () => {
		return rooms.find((room: any) => room.code === roomCode);
	};

	const handleRoomClick = (code: string) => {
		setRoomCode(code);
		setRooms((prevRooms: any) => {
			const newRooms = [ ...prevRooms ];
			const userIndex = newRooms.findIndex((room: any) => room.code === code);
			newRooms[userIndex].unread = 0;
			return newRooms;
		});
	};

	const handleRoomLeave = (code: string) => {
		setRoomCode('');
		setRooms(rooms.filter((room: any) => room.code !== code));
	};

	// TODO room parameter can be ROOM interface or boolean
	const handleModalClose = (room: any) => {
		if (room) {
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
				name={username!}
				onRoomClick={handleRoomClick}
			/>
			{roomCode ? (
				<React.Fragment>
					<Chat name={username!} room={roomCode} />
					<RoomDetails roomDetails={getCurrentRoom()} onRoomLeave={handleRoomLeave} username={username} />
				</React.Fragment>
			) : (
				<div className="chat chat--no-room">
					<div className="chat__header" />
					<div className="chat__body">
						<p>
							{rooms.length > 0 ? 'Click a room to start chatting!' : 'Create or Join a room to start a conversation!'}
						</p>
					</div>
				</div>
			)}

			<NewRoom open={openModal} onClose={handleModalClose} username={username} />
			<GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} onClose={handleSnackbarClose} />
		</div>
	);
};

export default Room;
