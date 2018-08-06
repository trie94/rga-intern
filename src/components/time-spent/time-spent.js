import React from 'react';
import './time-spent.css';
import Chart from './chart';

class TimeSpent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="time-spent" className="component-container">
                < Chart/>
            </div>
        );
    }
}

export default TimeSpent;