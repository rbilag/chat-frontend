import React from 'react';
import './style.css';
import { parseISO, format } from 'date-fns';

function RoomDetails({ roomDetails }: any) {
	console.log(roomDetails);
	const { code, description, createdAt, users } = roomDetails;
	return (
		<div className="room-details">
			<h1>{code}</h1>
			<p>{description}</p>
			<p>
				<i>Created last {format(parseISO(createdAt), 'EEE MMM d h:m b')}</i>{' '}
			</p>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					{users.map(({ firstName, lastName, username }: any) => {
						return (
							<tr key={username}>
								<td>{`${firstName} ${lastName}`}</td>
								<td>{username}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default RoomDetails;
