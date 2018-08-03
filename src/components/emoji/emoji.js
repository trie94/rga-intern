import React from 'react';
import './emoji.css';

class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='emoji'>
                EMOJI
            </div>
        );
    }
}

export default Emoji;