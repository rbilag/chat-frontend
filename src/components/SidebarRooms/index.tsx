import React from 'react';
import './style.css';

const SidebarRoom = ({ room, onRoomClick }: any) => {
	return (
		<div className="sidebarRoom" onClick={() => onRoomClick(room.code)}>
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
