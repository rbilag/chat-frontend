export enum ChatEvent {
	CONNECT = 'connection',
	DISCONNECT = 'disconnect',
	JOIN = 'join',
	MESSAGE = 'message',
	LEAVE = 'leave',
	ROOM_DELETE = 'room delete'
}
export enum MessageStatus {
	SENT = 'sent',
	DELIVERED = 'delivered',
	SEEN = 'seen',
	UNSENT = 'unsent',
	ERROR = 'error'
}

export const USER_INITIAL_VALUE = {
	username: '',
	firstName: '',
	lastName: '',
	email: ''
};
