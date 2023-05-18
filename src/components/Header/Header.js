import React from 'react';

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            chatId: ''
        }
    }

    render() {
        const { chatId } = this.props;

        return (
            <div className="header">
                {chatId}
            </div>
        )
    }
}

export default Header;
