import React from 'react';
import './keywords.css';

class KeywordBubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.radius = 10;
    }

    render() {
        return (
            <div className="keywords component-container">
                <div className="bubblechart">
                    Keyword bubble
            </div>
            </div>
        );
    }
}

export default KeywordBubble;