import { Avatar } from '@material-ui/core';
import React from 'react';
import { RoomPopulated } from '../../types';
import './style.css';

export interface SidebarRoomProps {
	room: RoomPopulated;
	onRoomClick: (code: string) => void;
}

const SidebarRoom = ({ room, onRoomClick }: SidebarRoomProps) => {
	return (
		<div className="sidebarRoom" onClick={() => onRoomClick(room.code)}>
			<Avatar src="https://i.pravatar.cc/300" />
			<div className="sidebarRoom__details">
				<h2>{room.code}</h2>
				<p>{room.description}</p>
			</div>
			{room.unread > 0 && (
				<div className="sidebarRoom__unread">
					<p>{room.unread}</p>
				</div>
			)}
		</div>
	);
};

export default SidebarRoom;
