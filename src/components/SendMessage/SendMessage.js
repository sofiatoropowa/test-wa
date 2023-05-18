import React from 'react';
import './styles/index.css';

class SendMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatId: props.chatId,
            message: '',
            isSent: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        const chatId = this.state.chatId + '@c.us';
        const message = this.state.message;
        const isSent = true;
        this.props.sendMessage(chatId, message, isSent);
        this.setState({
            message: '',
            isSent: true
        });
    }
    
    render() {
        return (
            <div className="send-message__wrap">
                <form className="send-message__form"
                      onSubmit={this.handleSubmit}>
                    <input
                        className="send-message__input"
                        onChange={this.handleChange}
                        value={this.state.message}
                        placeholder="Введите сообщение"
                        type="text"
                    />
                </form>
            </div>
        );
    }
}

export default SendMessage;
