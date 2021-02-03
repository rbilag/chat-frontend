import { UserRoom, LeaveEventResp, JoinEventResp, ChatMessage, MessagePopulated } from './../types';
import { ChatEvent } from '../constants';
import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
	private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

	public init(): SocketService {
		console.log('Initializing Socket Service');
		this.socket = io('localhost:8080');
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

	public onJoin(): Observable<JoinEventResp> {
		return fromEvent(this.socket, ChatEvent.JOIN);
	}

	public onLeave(): Observable<LeaveEventResp> {
		return fromEvent(this.socket, ChatEvent.LEAVE);
	}

	public onRoomDelete(): Observable<string> {
		return fromEvent(this.socket, ChatEvent.ROOM_DELETE);
	}

	public onMessage(): Observable<MessagePopulated> {
		return fromEvent(this.socket, ChatEvent.MESSAGE);
	}

	public disconnect(): void {
		console.log('Disconnecting...');
		this.socket.disconnect();
	}
}
