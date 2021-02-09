import { Avatar } from '@material-ui/core';
import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import { RoomPopulated, RoomUserPopulated, User } from '../../types';
import './style.css';

export interface SidebarRoomProps {
	room: RoomPopulated;
	userDetails: User;
	onRoomClick: (code: string) => void;
}

const SidebarRoom = ({ room, userDetails, onRoomClick }: SidebarRoomProps) => {
	const userIndex = room.users.findIndex(
		(roomUser: RoomUserPopulated) => roomUser.user.username === userDetails.username
	);
	return (
		<div className="sidebarRoom" onClick={() => onRoomClick(room.code)}>
			<Avatar>
				<GroupIcon />
			</Avatar>
			{userIndex >= 0 && (
				<React.Fragment>
					<div
						className={`sidebarRoom__details ${room.users[userIndex].unread > 0 && 'sidebarRoom__details--unread'} `}
					>
						<h2>{room.code}</h2>
						<p>{room.lastMessagePreview || room.description}</p>
					</div>
					{room.users[userIndex].unread > 0 && (
						<div className="sidebarRoom__unread">
							<p>{room.users[userIndex].unread}</p>
						</div>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default SidebarRoom;
