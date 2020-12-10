export interface ChatMessage {
	author: string;
	message: string;
	timestamp: string;
	status: string;
}

export interface UserRoom {
	name: string;
	room: string;
	timestamp: string;
}

export interface ChatRoom {
	name: string;
	recentActivity: {
		message: string;
		timestamp: string;
	};
	imageURL: string;
}
