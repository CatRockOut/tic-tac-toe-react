import React, { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/reducers/chatSlice';

function Chat({ player }) {
    const [inputValue, setInputValue] = useState('');
    const chatRef = useRef(null);
    const messages = useSelector((state) => state.chat.messages);
    const dispatch = useDispatch();

    // Listener that causes the chat to scroll to the last message when adding a message:
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function to scroll the chat to the last message:
    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };

    // Function to handle changes to the input:
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Function for sending messages to 'chatField':
    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            dispatch(
                addMessage({
                    player: player.playerFigureClass,
                    text: inputValue,
                })
            );
            setInputValue('');
        }
    };

    // Send a message by pressing 'Enter' key:
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Current time for the entered message:
    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div
            key={player.id}
            className={`${styles.chat} ${styles[player.className]}`}
        >
            <div className={styles.playerName}>
                <div
                    className={`${styles.circleContainer} ${
                        styles[player.playerFigureClass]
                    }`}
                ></div>
                <span>{player.name}</span>
            </div>
            <div ref={chatRef} className={styles.chatField}>
                <div className={styles.inputField}>
                    <input
                        type="text"
                        placeholder="Message"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className={styles.sendMessageButton}
                        onClick={handleSendMessage}
                    />
                </div>
                {messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`
                                    ${styles.message} 
                                    ${
                                        styles[
                                            message.player === 'cross'
                                                ? 'firstPlayer'
                                                : 'secondPlayer'
                                        ]
                                    }
                                `}
                        >
                            <span>{message.text}</span>
                            <div className={styles.time}>
                                {getCurrentTime()}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chat;
