import React from 'react';
import logo from '../../resources/images/wa.svg'

class Start extends React.Component {
    constructor() {
        super()
        this.state = {
            idInstance: '',
            apiTokenInstance: '',
            chatId: ''
        }
    }

    handleSubmit = () => {
        const { idInstance, apiTokenInstance } = this.state;
        this.props.dataSubmit(idInstance, apiTokenInstance);
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
                    <form className="start__form">
                        <input
                        className='start__input'
                        type="text"
                        value={this.state.idInstance}
                        onChange={(e) => this.setState({ idInstance: e.target.value })}
                        placeholder="ID Instance"
                        
                        />
                        <input
                        className='start__input'
                        type="text"
                        value={this.state.apiTokenInstance}
                        onChange={(e) => this.setState({ apiTokenInstance: e.target.value })}
                        placeholder="API Token Instance"
                        />
                        <button className='start__btn'
                                onClick={this.handleSubmit}>
                            Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Start;
