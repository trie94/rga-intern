import React from 'react';
import './bias-bar.css';
import bias_bar from '../../assets/bias_bar.png';

class BiasBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="bias-section">
                <div className="bias-bar component-container">
                    <img src={bias_bar} className="bar-img" />
                </div>
                <div className="below-bias">
                    <div className="cred-level component-container">
                        cred level
                    </div>
                    <div className="total-num component-container">
                        total num
                    </div>
                </div>
            </div>
        );
    }
}

export default BiasBar;