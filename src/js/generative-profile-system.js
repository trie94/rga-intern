import news from '../data/news-source.json';
import issues from '../data/issues.json';
import template from '../data/userdata-template';

const BIAS = ["far_left", "left", "mid_left",
    "center", "mid_right", "right", "far_right"
];

const CREDIBILITY = ["low", "mid", "high"];

// generate bias weight pool. 0 is highest 6 is lowest
const BIAS_WEIGHT = [0.4, 0.15, 0.15, 0.1, 0.1, 0.05, 0.05];
let weights_pool = [];

const generateWeightPool = () => {
    let index = 0;
    for (let i = 0; i < BIAS_WEIGHT.length; i++) {
        for (let j = 0; j < BIAS_WEIGHT[i] * 100; j++) {
            weights_pool[index] = i;
            index++;
        }
    }
}
generateWeightPool();

// generate credibility weight pool 0 is highest and 2 is lowest
const CRED_WEIGHT = [0.6, 0.3, 0.1];

function generateProfile(bias, cred, num, time) {
    // distribute random time based on the avg time
    let avg_time = [];
    for (let i = 0; i < num; i++) {
        avg_time[i] = time + getRandomFloat(-1, 1);
        // console.log(avg_time[i]);
    }

    // shuffle the bias order based on the bias input
    let _bias = [];

    switch (bias) {
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
            for (let i = 0, j = BIAS.length - 1; i < BIAS.length; i++ , j--) {
                _bias[i] = BIAS[j];
            }
            break;
    }

    // assign each 
    let reading_biases = [];
    for (let i = 0; i < num; i++) {
        reading_biases[i] = weights_pool[getRandomInt(1, 99)];
        reading_biases[i] = _bias[reading_biases[i]];
    }

    // get articles
    let articles = [];
    for (let i = 0; i < reading_biases.length; i ++){
        articles[i] = getArticle(reading_biases[i]);
    }
    
    console.log(articles);
    // return articles;
}

// get one random article
function getArticle(bias){
    let articles = [];
    let index = 0;

    for (let source_id of Object.keys(news)){
        let side = news[source_id].side;

        if (bias === side){
            articles.push(source_id);
        }
    }
    // console.log("articles: ", articles);

    if (articles.length > 0){
        index = getRandomInt(0, articles.length-1);
    } else {
        index = 0;
    }
    
    return articles[index];
}

let temp_person = generateProfile("left", 1, 20, 3);
// console.log(temp_person);

function getRandomFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) * 0.1;
}

function getRandomInt(min, max) {
    return Math.round((Math.random() * (max - min) + min));
}
// console.log(news);