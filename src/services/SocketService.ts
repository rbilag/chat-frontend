import { UserRoom, LeaveEventResp, JoinEventResp, ChatMessage, MessageEventResp } from './../types';
import { ChatEvent } from '../constants';
import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
	private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

	public init(): SocketService {
		console.log('Initializing Socket Service');
		this.socket = io(process.env.REACT_APP_SERVER_URL!);
		return this;
	}

	public join(userRoom: UserRoom, isFirst: boolean = false): void {
		console.log(`${userRoom.name} joined ${userRoom.room}`);
		this.socket.emit(ChatEvent.JOIN, { userRoom, isFirst });
	}

	public send(message: ChatMessage): void {
		console.log('Sending Message: ' + message);
		this.socket.emit(ChatEvent.MESSAGE, message);
	}

	public updateUnread(unread: number, roomCode: string, username: string): void {
		this.socket.emit(ChatEvent.UNREAD, { unread, roomCode, username });
	}

	public onJoin(): Observable<JoinEventResp> {
		return fromEvent(this.socket, ChatEvent.JOIN);
	}

	public onLeave(): Observable<LeaveEventResp> {
		return fromEvent(this.socket, ChatEvent.LEAVE);
	}

	public onRoomDelete(): Observable<string> {
		return fromEvent(this.socket, ChatEvent.ROOM_DELETE);
	}

	public onMessage(): Observable<MessageEventResp> {
		return fromEvent(this.socket, ChatEvent.MESSAGE);
	}

	public disconnect(): void {
		console.log('Disconnecting...');
		this.socket.disconnect();
	}
}
