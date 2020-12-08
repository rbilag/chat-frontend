export interface ChatMessage {
    author: string;
    message: string;
    timestamp: string;
    status: string;
}
  
export interface ChatRoom {
    name: string;
    recentActivity: {
        message: string;
        timestamp: string;
    }
    imageURL: string;
}

export interface ChatState {
    input: string;
    messages: ChatMessage[];
}