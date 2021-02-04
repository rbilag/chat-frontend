import React from 'react';
import { parseISO } from 'date-fns';
import { MessagePopulated } from '../../types';
import './style.css';

export interface ChatHeaderProps {
	roomCode: string;
	messages: MessagePopulated[];
	formatDate: (date: Date) => string;
}

function ChatHeader({ roomCode, messages, formatDate }: ChatHeaderProps) {
	return (
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
	);
}

export default ChatHeader;
