import React from 'react';
import './emoji.css';
import highest from '../../assets/highest_emoji.png';
import high from '../../assets/high_emoji.png';
import mid from '../../assets/mid_emoji.png';
import low from '../../assets/low_emoji.png';
import lowest from '../../assets/lowest_emoji.png';
import { bias, user, score } from '../../data/user-data';

let emoji_colors = ["#354DF1", "#128DF3", "#476CE3", "#AE10CA", "#D2178E", "#ED255B", "#FA3841"];

function getEmoji(score) {

    let emoji_index = 0;

    if (score >= 0 && score <= 20) { emoji_index = 0; }
    else if (score >= 21 && score <= 40) { emoji_index = 1; }
    else if (score >= 41 && score <= 60) { emoji_index = 2; }
    else if (score >= 61 && score <= 80) { emoji_index = 3; }
    else if (score >= 81 && score <= 100) { emoji_index = 4; }

    return emoji_index;
}

function getColor(bias) {
    let color;
    switch (bias) {
        case "far_left":
            color = emoji_colors[0];
            break;

        case "left":
            color = emoji_colors[1];
            break;

        case "mid_left":
            color = emoji_colors[2];
            break;

        case "center":
            color = emoji_colors[3];
            break;

        case "mid_right":
            color = emoji_colors[4];
            break;

        case "right":
            color = emoji_colors[5];
            break;

        case "far_right":
            color = emoji_colors[6];
            break;
    }
    return color;
}

class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.emoji = [lowest, low, mid, high, highest];
        this.color = getColor(bias);
        this.emoji_index = getEmoji(score);
    }

    render() {
        const colorObj = {
            background: this.color
        };

        return (
            <div className="emoji component-container">
                <p className="emoji-title">OVERALL RATING</p>
                <div className="emoji-color" style={colorObj}>
                    <img className="emoji-img" src={this.emoji[this.emoji_index]}></img>
                </div>
            </div>
        );
    }
}

export default Emoji;