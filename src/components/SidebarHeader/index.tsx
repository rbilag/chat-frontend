import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { USER_INITIAL_VALUE } from '../../constants';
import { useChat } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';
import chatHttp from '../../services/Http';
import './style.css';
import { useHistory } from 'react-router-dom';

export interface SidebarHeaderProps {
	history: ReturnType<typeof useHistory>;
	onNewRoom: () => void;
}

function SidebarHeader({ history, onNewRoom }: SidebarHeaderProps) {
	const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
	const [ loggedInUser, setLoggedInUser ] = useUser();
	const chatSocket = useChat();

	const onLogout = () => {
		setAnchorEl(null);
		console.log('Disconnecting Socket Context..');
		chatSocket.disconnect();
		chatHttp
			.changeLoginStatus({ newValue: false })
			.then((resp) => {
				localStorage.clear();
				setLoggedInUser(USER_INITIAL_VALUE);
				history.push('/login');
			})
			.catch(({ response }) => {
				console.log(response);
			});
	};
	return (
		<div className="sidebar__header">
			<div className="sidebar__headerAvatar">
				<Avatar src="https://i.pravatar.cc/300" />
				<p>{loggedInUser.firstName + ' ' + loggedInUser.lastName}</p>
			</div>
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
	);
}

export default SidebarHeader;
