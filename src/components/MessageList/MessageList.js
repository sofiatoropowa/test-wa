import React from 'react';

class MessageList extends React.Component {
    render() {
        const { messages } = this.props;
    
        return (
            <div className="message-list__wrap">
                <div className="message-list">
                    {messages && messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index} className={`message-list__item ${message.isSent ? 'sent' : 'received'}`}>
                                <div>{message.senderId}</div>
                                <div className='message-list__item-text'>{message.text}</div>
                            </div>
                        ))
                    ) : (
                        <li className="message">No messages</li>
                    )}
                </div>
            </div>
        );
    }
}

export default MessageList;