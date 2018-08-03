import React from 'react';
import './bias-bar.css';

class BiasBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='bias-bar'>
                Bias
            </div>
        );
    }
}

export default BiasBar;