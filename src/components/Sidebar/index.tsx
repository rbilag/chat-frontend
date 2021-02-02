import React from 'react';
import './style.css';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SidebarRoom from '../SidebarRooms';
import chatHttp from '../../services/Http';
import { useChat } from '../../context/ChatContext';

const Sidebar = ({ onNewRoom, rooms, history, onRoomClick }: any) => {
	const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
	const chatSocket = useChat();

	const onLogout = () => {
		setAnchorEl(null);
		console.log('Disconnecting Socket Context..');
		chatSocket.disconnect();
		chatHttp
			.changeLoginStatus({ newValue: false })
			.then((resp) => {
				console.log(resp);
				localStorage.clear();
				history.push('/login');
			})
			.catch(({ response }) => {
				console.log(response);
			});
	};

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<div className="sidebar__headerIcons">
					<IconButton onClick={onNewRoom}>
						<ChatIcon />
					</IconButton>
					<IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id="sidebar-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={() => setAnchorEl(null)}
					>
						<MenuItem onClick={onLogout}>Logout</MenuItem>
					</Menu>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchIcon />
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div>
			<div className="sidebar__rooms">
				{rooms.map((room: any, i: number) => <SidebarRoom key={i} room={room} onRoomClick={onRoomClick} />)}
			</div>
		</div>
	);
};

export default Sidebar;
