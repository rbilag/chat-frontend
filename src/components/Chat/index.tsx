import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { ChatMessage } from '../../types';
import { ChatEvent } from '../../constants';
import { MessageStatus } from '../../constants';
import io from 'socket.io-client';

interface ChatProps {
    messages: ChatMessage[];
}

const Chat = ({ messages }: ChatProps) => {
    const { current: socketInstance } = useRef(io('localhost:9000'));
    const [input, setInput] = useState('');

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const messageDetails: ChatMessage = {
            author: 'Rose',
            message: input,
            timestamp: new Date().toISOString(),
            status: MessageStatus.SENT
        };
        setInput('');

        console.log('sending message: ' + JSON.stringify(messageDetails));
        socketInstance.emit(ChatEvent.MESSAGE, messageDetails);
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p> Last seen at...</p>
                </div>
                <div className="chat__headerIcons">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(({ author, message, timestamp, status }, i) => {
                    // TODO temp
                    const received = true;
                    
                    return (
                        <p
                            key={i}
                            className={`chat__message ${received && 'chat__message--receiver'
                                }`}
                        >
                            <span className="chat__person">{author}</span>
                            {message}
                            <span className="chat__timestamp">{timestamp}</span>
                        </p>
                    );
                })}
            </div>
            <div className="chat__footer">
                <IconButton>
                    <MoodIcon />
                </IconButton>
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Start typing.."
                    />
                    <button onClick={sendMessage} type="submit">
                        Send
          </button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Chat;
