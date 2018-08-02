import news from '../data/news-source.json';
import issues from '../data/issues.json';

const BIAS = [
    "far_left",
    "left",
    "mid_left",
    "center",
    "mid_right",
    "right",
    "far_right"
];

// const CREDIBILITY = {
//     "low": low,
//     "mid": mid,
//     "high": high
// }

// generate bias weight pool. 0 is highest 6 is lowest
const BIAS_WEIGHT = [0.4, 0.15, 0.15, 0.1, 0.1, 0.05, 0.05];
const generateWeightPool = () => {
    let weights_pool = [];
    for (let i = 0; i < BIAS_WEIGHT.length; i ++){
        for (let j = 0; j < BIAS_WEIGHT[i] * 100; j++){
            weights_pool[i] = i;
            console.log(weights_pool[i]);
        }
    }
}
generateWeightPool();

function generateProfile(bias, cred, num, time) {
    // distribute random time based on the avg time
    let avg_time = [];
    for (let i = 0; i < num; i++) {
        avg_time[i] = time + getRandomFloat(-1, 1);
        // console.log(avg_time[i]);
    }
    
    // get random int in the range of 1 -100
    let index = getRandomInt(1,100);

    // shuffle the bias order based on the bias input
    let _bias = [];

    switch (bias){
        case "far_left":
        _bias = BIAS.concat();
        break;

        case "left":
        _bias = ["left", "far_left", "mid_left", "center", "mid_right", "right", "far_right"];
        break;

        case "mid_left":
        _bias = ["mid_left", "left", "center", "far_left", "mid_right", "right", "far_right"];
        break;

        case "center":
        _bias = ["center", "mid_left", "mid_right", "left", "right", "far_left", "far_right"];
        break;

        case "mid_right":
        _bias = ["mid_right", "right", "center", "far_right", "mid_left", "left", "far_left"];
        break;

        case "right":
        _bias = ["right", "far_right", "mid_right", "center", "mid_left", "left", "far_left"];
        break;

        case "far_right":
        for (let i = 0, j = BIAS.length-1; i < BIAS.length; i ++, j --){
            _bias[i] = BIAS[j];
        }
    }

    console.log("bias: ", bias, "\n", _bias);
}

function getRandomFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) * 0.1;
}

function getRandomInt(min, max){
    return Math.round((Math.random() * (max - min) + min));
}

generateProfile("far_right", 1, 5, 3);
console.log(getRandomInt(0,100));

console.log(news);