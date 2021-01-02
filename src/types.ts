export interface UserRoom {
	name: string;
	room: string;
}

export interface ChatMessage {
	userRoom: UserRoom;
	content: string;
	status?: string;
	isSystem?: boolean;
}
