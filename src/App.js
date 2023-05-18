import React from 'react';

import Start from './components/Start/Start';
import Header from './components/Header/Header';
import MessageList from "./components/MessageList/MessageList";
import SendMessage from './components/SendMessage/SendMessage';
import AddChat from './components/AddChat/AddChat';

// 1101820083
// d7c1d19529e34f99827ccebbfd8fb15e63bd796b310146ebb2

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            idInstance: '',
            apiTokenInstance: '',
            chatId: '',
            messages: []
        };
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.getMessage();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    addMessage(message, isSent) {
        const newMessage = { ...message, isSent };
        const messages = [...this.state.messages, newMessage];
        this.setState({ messages }, () => {
          localStorage.setItem('messages', JSON.stringify(messages));
        });
      }

    sendMessage(id, text) {
        const { idInstance, apiTokenInstance } = this.state;
        let url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId: id,
                message: text,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            console.log('Message sent: ', data);
            this.addMessage({text: text, isSent: true}, true);
            this.getMessage();
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    }

    getMessage() {
        const { idInstance, apiTokenInstance } = this.state;
        let url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
    
        fetch(url, {
            method: 'GET',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(data => {
            const { messageData } = data.body;
            if (messageData && messageData.typeMessage === 'textMessage') {
                const { textMessage } = messageData.textMessageData;
                const newMessage = {
                    text: textMessage
                };
                this.addMessage(newMessage);
            }
        })
        .catch(error => console.log('error', error));
    }

    dataSubmit = (idInstance, apiTokenInstance) => {
        this.setState(
            {
            idInstance: idInstance,
            apiTokenInstance: apiTokenInstance,
            },
            () => {
                this.getMessage();
            }
        );
    };

    createChat = (chatId) => {
        this.setState(
            {
                chatId: chatId,
            },
            () => {
                this.getMessage();
            }
        );
    };

    render() {
        const { idInstance, apiTokenInstance, chatId, messages } = this.state;

        return (
            <div className="app">
                {idInstance === '' || apiTokenInstance === '' ? (
                    <Start 
                        chatId={this.state.chatId}
                        idInstance={this.state.idInstance}
                        apiTokenInstance={this.state.apiTokenInstance} 
                        dataSubmit={this.dataSubmit} />
                ) : chatId === '' ? (
                    <AddChat createChat={this.createChat} />
                ) : (
                    <>
                    <Header 
                        chatId={this.state.chatId} />
                    <MessageList
                        chatId={this.state.chatId}
                        messages={this.state.messages}
                        addMessage={this.addMessage} />
                    <SendMessage
                        chatId={this.state.chatId}
                        sendMessage={this.sendMessage}
                        idInstance={this.state.idInstance}
                        apiTokenInstance={this.state.apiTokenInstance} />
                    </>
                )}
            </div>
        );
    }
}

export default App;
