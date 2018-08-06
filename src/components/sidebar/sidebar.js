import React from 'react';
import './sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.setState({ isOpen: !isOpen });
    };



    render() {
        let is_open = this.state.isOpen ? 'open' : 'closed';

        return (
            <div className={`sidebar ${is_open} component-container`} onClick={this.handleClick}>
                Sidebar
            </div>
        );
    };
}

export default Sidebar;