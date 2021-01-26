import React from 'react';
import './style.css';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SidebarRoom from '../SidebarRooms';
import chatHttp from '../../services/Http';

const Sidebar = ({ onNewRoom, rooms, history }: any) => {
	console.log(history);
	const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
	// TODO add on create room listener

	const onLogout = () => {
		setAnchorEl(null);
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
			<div className="sidebar__rooms">{rooms.map((room: any, i: number) => <SidebarRoom key={i} room={room} />)}</div>
		</div>
	);
};

export default Sidebar;
