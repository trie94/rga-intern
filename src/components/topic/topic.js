import React from 'react';
import './topic.css';
import KeywordBubble from './keywords';

class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='topic component-container'>
                Topic
                <KeywordBubble/>
            </div>
        );
    }
}

export default Topic;