import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="header component-container">
                Header
            </div>
        );
    }
}

export default Header;