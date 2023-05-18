import React from 'react';
import logo from '../../resources/images/wa.svg'

class AddChat extends React.Component {
    constructor() {
        super()
        this.state = {
            chatId: ''
        }
    }

    handleChange = (event) => {
        this.setState({ chatId: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { chatId } = this.state;
        this.props.createChat(chatId);
    }

    render() {
        return (
            <div className='start__page'>
                <div className='start__header'>
                    <div className='start__header-wrap'>
                        <img src={logo} />
                        <span>WhatsApp Web</span>
                    </div>
                </div>
                <div className="start">
                    <form className="start__form" onSubmit={this.handleSubmit}>
                        <input
                            className="start__input"
                            onChange={this.handleChange}
                            value={this.state.chatId}
                            placeholder="Номер получателя"
                            type="text"
                        />
                        <button className='start__btn'
                                onClick={() => this.handleSubmit}>Создать чат</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddChat;
