import React from 'react';
import './bias-bar.css';
import bias_bar from '../../assets/bias_bar.png';
import bar_left from '../../assets/bar_left.png';
import bar_center from '../../assets/bar_center.png';
import bar_right from '../../assets/bar_right.png';
import bar_emoji from '../../assets/bar_emoji.png';

import { bias, cred, totalNum, user, score } from '../../data/user-data';

function getPosition(bias){
    let position = [];

    switch (bias) {
        case "far_left":
            position = [1,0,0,0,0,0,0];
            break;

        case "left":
            position = [0,1,0,0,0,0,0];
            break;

        case "mid_left":
            position = [0,0,1,0,0,0,0];
            break;

        case "center":
            position = [0,0,0,1,0,0,0];
            break;

        case "mid_right":
            position = [0,0,0,0,1,0,0];
            break;

        case "right":
            position = [0,0,0,0,0,1,0];
            break;

        case "far_right":
            position = [0,0,0,0,0,0,1];
            break;
    }
    return position;
}

function getOpac(arr){
    let opacObj = [];
    for (let i = 0; i < arr.length; i ++){
        opacObj[i] = {opacity: arr[i]};
    }
    return opacObj;
}

class BiasBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.cred = cred;
        this.total = totalNum;
    }

    render() {

        return (
            <div className="bias-section component-container">
                <div className="black">
                    <p className="bias-title">BIAS RATING</p>
                    <div className="bias-bar">
                        <div className="bar-container">
                            <img src={bias_bar} className="bar-img" />
                            <div className="bar-emojis">
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[0]}/>
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[1]}/>
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[2]}/>
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[3]}/>
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[4]}/>
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[5]}/>
                                <img src={bar_emoji} className="bar-emoji" style={getOpac(getPosition(bias))[6]}/>
                            </div>
                        </div>
                        <div className="labels-container">
                            <img src={bar_left} className="bar-labels" />
                            <img src={bar_center} className="bar-labels" />
                            <img src={bar_right} className="bar-labels" />
                        </div>
                    </div>
                    <div className="below-bias">
                        <div className="cred-level component-container">
                            <p className="bias-title">AVERAGE CREDIBILITY</p>
                                <p className="value">{this.cred}</p>
                    </div>
                        <div className="total-num component-container">
                            <p className="bias-title">NUMBER OF ARTICLES READ</p>
                            <p className="value">{this.total}</p>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BiasBar;