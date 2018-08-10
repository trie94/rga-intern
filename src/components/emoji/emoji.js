import React from 'react';
import './emoji.css';
import highest from '../../assets/highest_emoji.png';
import high from '../../assets/high_emoji.png';
import mid from '../../assets/mid_emoji.png';
import low from '../../assets/low_emoji.png';
import lowest from '../../assets/lowest_emoji.png';
import emoji_scores from '../../assets/emoji_scores.png';

const EMOJI_COLORS = ["#354DF1", "#128DF3", "#476CE3", "#AE10CA", "#D2178E", "#ED255B", "#FA3841"];

class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bias: this.props.bias,
            score: this.props.score,
            color: this.getColor(this.props.bias),
            emoji: this.getEmoji(this.props.score)
        };
        this.emoji_scores = emoji_scores;
        this.color = this.getColor(this.state.bias);
        
        this.getEmoji = this.getEmoji.bind(this);
        this.getColor = this.getColor.bind(this);
    }

    componentDidUpdate(){

        if (this.state.bias !== this.props.bias){
            this.setState({
                bias: this.props.bias,
                color: this.getColor(this.props.bias)
            });
        }
        if (this.state.score !== this.props.score){
            this.setState({
                score: this.props.score,
                emoji: this.getEmoji(this.props.score)
            })
        }
    }

    getEmoji(score) {

        let emoji_index = 0;
        let emoji_list = [lowest, low, mid, high, highest];
    
        if (score >= 0 && score <= 20) { emoji_index = 0; }
        else if (score >= 21 && score <= 40) { emoji_index = 1; }
        else if (score >= 41 && score <= 60) { emoji_index = 2; }
        else if (score >= 61 && score <= 80) { emoji_index = 3; }
        else if (score >= 81 && score <= 100) { emoji_index = 4; }
    
        return emoji_list[emoji_index];
    }
    
    getColor(bias) {
        let color;
        switch (bias) {
            case "far_left":
                color = EMOJI_COLORS[0];
                break;
    
            case "left":
                color = EMOJI_COLORS[1];
                break;
    
            case "mid_left":
                color = EMOJI_COLORS[2];
                break;
    
            case "center":
                color = EMOJI_COLORS[3];
                break;
    
            case "mid_right":
                color = EMOJI_COLORS[4];
                break;
    
            case "right":
                color = EMOJI_COLORS[5];
                break;
    
            case "far_right":
                color = EMOJI_COLORS[6];
                break;
        }
        return color;
    }

    render() {
        const colorObj = {
            background: this.state.color
        };

        return (
            <div className="emoji">
                <p className="titles">SCORE  <span className="score">{this.state.score}</span> </p>  
                <img className="emoji-img" src={this.state.emoji} style={colorObj}></img>
                <img className="emoji-scores-img" src={this.emoji_scores}></img>
            </div>
        );
    }
}

export default Emoji;