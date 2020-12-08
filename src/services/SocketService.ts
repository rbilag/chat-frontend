import { ChatEvent } from '../constants';
import io from 'socket.io-client';
import { ChatMessage } from '../types';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

    public init(): SocketService {
        console.log('Initializing Socket Service');
        this.socket = io('localhost:9000');
        return this;
    }

    public send(message: ChatMessage): void {
        console.log('Sending Message: ' + message);
        this.socket.emit(ChatEvent.MESSAGE, message);
    }

    public onMessage(): Observable<ChatMessage> {
        return fromEvent(this.socket, ChatEvent.MESSAGE);
    }

    public disconnect(): void {
        console.log('Disconnecting...');
        this.socket.disconnect();
    }
}