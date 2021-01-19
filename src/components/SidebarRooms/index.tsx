import React from 'react';
import './style.css';

const SidebarRoom = ({ room }: any) => {
	return (
		<div className="sidebarRoom">
			<div className="sidebarRoom__details">
				<h2>{room.code}</h2>
				<p>Room details</p>
			</div>
		</div>
	);
};

export default SidebarRoom;
