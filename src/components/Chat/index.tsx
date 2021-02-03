import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import { ChatMessage, MessagePopulated } from '../../types';
import chatHttp from '../../services/Http';
import { parseISO, differenceInCalendarDays, format, formatDistanceToNow } from 'date-fns';
import { useChat } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';

export interface ChatProps {
	roomCode: string;
}

const Chat = ({ roomCode }: ChatProps) => {
	const [ messages, setMessages ] = useState([] as MessagePopulated[]);
	const [ input, setInput ] = useState('');
	const chatSocket = useChat();
	const [ loggedInUser ] = useUser();
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	useEffect(
		() => {
			if (chatSocket === null) return;
			const subscription = chatSocket.onMessage().subscribe((message: MessagePopulated) => {
				if (message.roomCode === roomCode) {
					setMessages((prevMsgs) => [ ...prevMsgs, message ]);
				}
			});
			return () => {
				subscription.unsubscribe();
			};
		},
		[ chatSocket, roomCode ]
	);

	useEffect(
		() => {
			chatHttp
				.getMessages({ roomCode })
				.then(({ data }) => {
					setMessages((prevMsgs) => data.messages);
				})
				.catch(({ response }) => {
					console.log(response.data);
				});
		},
		[ roomCode ]
	);

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (input) {
			const messageDetails: ChatMessage = {
				userRoom: {
					name: loggedInUser.username,
					room: roomCode
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
					<h3>Room {roomCode}</h3>
					<p>
						{messages.length > 0 ? (
							'Last activity ' + formatDate(parseISO(messages[messages.length - 1].createdAt))
						) : (
							'No recent activities...'
						)}
					</p>
				</div>
				<div className="chat__headerIcons">
					{/* TODO future implementation */}
					{/* <IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton> */}
				</div>
			</div>
			<div className="chat__body">
				{/* TODO status  */}
				{messages.map(({ content, user, createdAt }, i) => {
					const lastMessage = messages.length - 1 === i;
					return (
						<p
							key={i}
							ref={lastMessage ? setRef : null}
							className={`chat__message ${loggedInUser.username === user.username &&
								'chat__message--sender'} ${user.username === 'Chatbot' && 'chat__message--bot'}`}
						>
							<span className="chat__person">{loggedInUser.username === user.username ? 'You' : user.username}</span>
							{content}
							<span className="chat__timestamp">{formatDate(parseISO(createdAt))}</span>
						</p>
					);
				})}
			</div>
			<div className="chat__footer">
				{/* <IconButton>
					<MoodIcon />
				</IconButton> */}
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
