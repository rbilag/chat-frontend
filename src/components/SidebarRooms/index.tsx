import { Avatar } from '@material-ui/core';
import React from 'react';
import './style.css';

const SidebarRoom = ({ room }: any) => {
	return (
		<div className="sidebarRoom">
			<Avatar src="https://i.pravatar.cc/300" />
			<div className="sidebarRoom__details">
				<h2>{room.code}</h2>
				<p>Room details</p>
			</div>
		</div>
	);
};

export default SidebarRoom;
