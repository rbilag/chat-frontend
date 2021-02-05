import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import SendIcon from '@material-ui/icons/Send';
import { ChatMessage, User } from '../../types';
import './style.css';

export interface ChatFooterProps {
	roomCode: string;
	loggedInUser: User;
}
function ChatFooter({ roomCode, loggedInUser }: ChatFooterProps) {
	const [ input, setInput ] = useState('');
	const chatSocket = useChat();
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
	return (
		<div className="chat__footer">
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
	);
}

export default ChatFooter;
