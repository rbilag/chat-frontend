import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
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
	const { userDetails, setUserDetails } = useUser();
	const chatSocket = useChat();

	const onLogout = () => {
		setAnchorEl(null);
		console.log('Disconnecting Socket Context..');
		chatSocket.disconnect();
		chatHttp
			.changeLoginStatus({ newValue: false })
			.then((resp) => {
				localStorage.clear();
				setUserDetails(USER_INITIAL_VALUE);
				history.push('/login');
			})
			.catch(({ response }) => {
				console.log(response);
			});
	};
	return (
		<div className="sidebar__header">
			<div className="sidebar__headerAvatar">
				<Avatar>
					{userDetails.firstName && userDetails.lastName ? (
						userDetails.firstName.charAt(0) + userDetails.lastName.charAt(0)
					) : (
						<PersonIcon />
					)}
				</Avatar>
				<p className="header__text">{userDetails.firstName + ' ' + userDetails.lastName}</p>
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
