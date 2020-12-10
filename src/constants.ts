export enum ChatEvent {
	CONNECT = 'connection',
	DISCONNECT = 'disconnect',
	JOIN = 'join',
	MESSAGE = 'message',
	SYSTEM = 'system'
}
export enum MessageStatus {
	SENT = 'sent',
	DELIVERED = 'delivered',
	SEEN = 'seen',
	UNSENT = 'unsent',
	ERROR = 'error'
}
