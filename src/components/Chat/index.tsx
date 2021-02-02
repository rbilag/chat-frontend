import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import React, { useState, useEffect } from 'react';
import './style.css';
import { ChatMessage } from '../../types';
import chatHttp from '../../services/Http';
import { parseISO, differenceInCalendarDays, format, formatDistanceToNow } from 'date-fns';
import { useChat } from '../../context/ChatContext';

const Chat = ({ name, room }: any) => {
	const [ messages, setMessages ] = useState([] as any[]);
	const [ input, setInput ] = useState('');
	const chatSocket = useChat();

	useEffect(
		() => {
			if (chatSocket === null) return;
			const subscription = chatSocket.onMessage().subscribe((message: any) => {
				if (message.roomCode === room) {
					setMessages((prevMsgs) => [ ...prevMsgs, message ]);
				}
			});
			return () => {
				subscription.unsubscribe();
			};
		},
		[ chatSocket, room ]
	);

	useEffect(
		() => {
			chatHttp
				.getMessages({ roomCode: room })
				.then(({ data }) => {
					setMessages((prevMsgs) => data.messages);
				})
				.catch(({ response }) => {
					console.log(response.data);
				});
		},
		[ room ]
	);

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (input) {
			const messageDetails: ChatMessage = {
				userRoom: {
					name,
					room
				},
				content: input
			};
			setInput('');

			console.log('sending message: ' + JSON.stringify(messageDetails));
			chatSocket.send(messageDetails);
		}
	};

	const formatDate = (date: Date) => {
		return differenceInCalendarDays(new Date(), date) > 2
			? format(date, 'EEE MMM d h:m b')
			: formatDistanceToNow(date, { addSuffix: true });
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<div className="chat__headerInfo">
					<h3>Room {room}</h3>
					<p>
						{messages.length > 0 ? (
							'Last activity ' + formatDate(parseISO(messages[messages.length - 1].createdAt))
						) : (
							'No recent activities...'
						)}
					</p>
				</div>
				<div className="chat__headerIcons">
					<IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{/* TODO status  */}
				{messages.map(({ content, user, createdAt }: any, i) => {
					return (
						<p
							key={i}
							className={`chat__message ${name === user.username && 'chat__message--sender'} ${user.username ===
								'Chatbot' && 'chat__message--bot'}`}
						>
							<span className="chat__person">{name === user.username ? 'You' : user.username}</span>
							{content}
							<span className="chat__timestamp">{formatDate(parseISO(createdAt))}</span>
						</p>
					);
				})}
			</div>
			<div className="chat__footer">
				<IconButton>
					<MoodIcon />
				</IconButton>
				<form>
					<input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Start typing.." />
					<button onClick={sendMessage} type="submit">
						Send
					</button>
				</form>
				<IconButton onClick={sendMessage}>
					<SendIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default Chat;
