import React, { useState } from 'react';
import './style.css';
import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import ConfirmationDialog from '../ConfirmationDialog';
import chatHttp from '../../services/Http';
import { useUser } from '../../context/UserContext';
import PhotoIcon from '@material-ui/icons/Photo';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import { RoomPopulated, RoomUserPopulated } from '../../types';

export interface RoomDetailsProps {
	roomDetails: RoomPopulated;
	onRoomLeave: (code: string) => void;
}

function RoomDetails({ roomDetails, onRoomLeave }: RoomDetailsProps) {
	const { code, description, users } = roomDetails;
	const [ isOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ type, setType ] = useState('Leave');
	const { userDetails } = useUser();

	const openDialog = (type: string) => {
		setIsOpen(true);
		setType(type);
		if (type === 'Leave') {
			setContent(
				'You will not be able to receive messeges sent in this room anymore. Other users in the room will also be notified when you leave.'
			);
		} else {
			setContent('You will not be able to revert this deletion.');
		}
	};

	const handleModalClose = async (willProceed: boolean) => {
		try {
			setIsOpen(false);
			if (willProceed) {
				if (type === 'Leave') {
					await chatHttp.leaveRoom({ roomCode: code });
					onRoomLeave(code);
				} else {
					await chatHttp.deleteRoom({ roomCode: code });
				}
			}
		} catch (e) {
			console.log(e.response.data);
		}
	};

	const generateOptions = () => {
		const ROOM_OPTIONS = [
			{ label: 'Change Group Photo', icon: <PhotoIcon />, adminOnly: false },
			{ label: 'Leave Group', icon: <MeetingRoomIcon />, adminOnly: false, action: () => openDialog('Leave') },
			{ label: 'Delete Group', icon: <DeleteIcon />, adminOnly: true, action: () => openDialog('Delete') }
		];
		return ROOM_OPTIONS.map(({ label, icon, adminOnly, action }, i) => {
			return (
				(!adminOnly || (adminOnly && users[0].user.username === userDetails.username)) && (
					<ListItem key={i} button onClick={action}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={label} />
					</ListItem>
				)
			);
		});
	};

	const generateUserList = () => {
		return users.map(({ user }: RoomUserPopulated) => {
			const { username, firstName, lastName } = user;
			return (
				<ListItem key={username}>
					<ListItemAvatar>
						<Avatar>{firstName && lastName ? firstName.charAt(0) + lastName.charAt(0) : <PersonIcon />}</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${firstName} ${lastName}`} secondary={username} />
				</ListItem>
			);
		});
	};

	return (
		<div className="room__details">
			<Avatar className="avatar--large">
				<GroupIcon />
			</Avatar>
			<h1>{code}</h1>
			<p>{description}</p>
			<List>{generateOptions()}</List>
			<List>{generateUserList()}</List>

			<ConfirmationDialog open={isOpen} onClose={handleModalClose} content={content} />
		</div>
	);
}

export default RoomDetails;
