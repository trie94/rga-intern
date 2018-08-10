import React from 'react';
import './bias-bar.css';
import bias_bar from '../../assets/bias_bar.png';
import bar_left from '../../assets/bar_left.png';
import bar_center from '../../assets/bar_center.png';
import bar_right from '../../assets/bar_right.png';
import bar_emoji from '../../assets/bar_emoji.png';

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
        this.state = {
            bias: this.props.bias,
            cred: this.props.cred,
            totalNum: this.props.totalNum,
            pos: getPosition(this.props.bias)
        };
    }

    componentDidUpdate(){

        if (this.state.bias !== this.props.bias){
            this.setState({
                bias: this.props.bias,
                pos: getPosition(this.props.bias)
            });
        }
        if (this.state.cred !== this.props.cred){
            this.setState({
                cred: this.props.cred
            });
        }
        if (this.state.totalNum !== this.props.totalNum){
            this.setState({
                totalNum: this.props.totalNum
            });
        }
    }

    render() {

        return (
            <div className="bias-section component-container">
                <p className="titles">BIAS</p>
                <div className="bias-bar">
                    <div className="bar-container">
                        <img src={bias_bar} className="bar-img" />
                        <div className="bar-emojis">
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[0]}/>
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[1]}/>
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[2]}/>
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[3]}/>
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[4]}/>
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[5]}/>
                            <img src={bar_emoji} className="bar-emoji" style={getOpac(this.state.pos)[6]}/>
                        </div>
                    </div>
                    <div className="labels-container">
                        <img src={bar_left} className="bar-labels" />
                        <img src={bar_center} className="bar-labels" />
                        <img src={bar_right} className="bar-labels" />
                    </div>
                </div>
                <div className="below-bias">
                    <div className="cred-level">
                        <p className="titles">CREDIBILITY</p>
                        <p className="value">{this.state.cred}</p>
                    </div>
                    <div className="total-num">
                        <p className="titles">ARTICLES READ</p>
                        <p className="value">{this.state.totalNum}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default BiasBar;