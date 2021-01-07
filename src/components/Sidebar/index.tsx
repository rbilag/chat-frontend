import React from 'react';
import './style.css';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SidebarMember from '../SidebarMember';

const Sidebar = ({ onNewRoom }: any) => {
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<div className="sidebar__headerAvatar">
					<Avatar src="https://i.pravatar.cc/300" />
				</div>
				<div className="sidebar__headerIcons">
					<IconButton onClick={onNewRoom}>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchIcon />
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div>
			<div className="sidebar__members">
				<SidebarMember />
				<SidebarMember />
				<SidebarMember />
			</div>
		</div>
	);
};

export default Sidebar;
