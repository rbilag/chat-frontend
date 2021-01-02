import { UserRoom } from './../types';
import { ChatEvent } from '../constants';
import io from 'socket.io-client';
import { ChatMessage } from '../types';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
	private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

	public init(): SocketService {
		console.log('Initializing Socket Service');
		this.socket = io('localhost:8080');
		return this;
	}

	public join(user: UserRoom): void {
		console.log(`${user.name} joined ${user.room}`);
		this.socket.emit(ChatEvent.JOIN, user);
	}

	public send(message: ChatMessage): void {
		console.log('Sending Message: ' + message);
		this.socket.emit(ChatEvent.MESSAGE, message);
	}

	public onJoin(): Observable<UserRoom> {
		return fromEvent(this.socket, ChatEvent.JOIN);
	}

	public onMessage(): Observable<any> {
		return fromEvent(this.socket, ChatEvent.MESSAGE);
	}

	public disconnect(): void {
		console.log('Disconnecting...');
		this.socket.disconnect();
	}
}
