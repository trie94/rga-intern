import React from 'react';

class KeywordBubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.radius = 10;
    }

    render() {
        return (
            <div className='keywords'>
            Keyword bubble
            </div>
        );
    }
}

export default KeywordBubble;