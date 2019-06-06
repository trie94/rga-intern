import news from '../data/news-source.json';
import issues from '../data/issues.json';

const BIAS = ["far_left", "left", "mid_left", "center", "mid_right", "right", "far_right"];
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

function generateProfile(bias, cred, num, time) {

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

    // instantiate blank template. profile is an array of media_intake
    let profile = [];

    // profile components
    let sources = [];
    let avg_time = [];
    let issues = [];
    let temp_article = "";
    let topic = "Politics";

    for (let i = 0; i < num; i++) {
        sources[i] = getArticle(reading_biases[i], cred);
        avg_time[i] = time + getRandomFloat(-1, 1);
        issues[i] = getIssue();

        if (sources[i] !== undefined) {
            temp_article = sources[i].concat();
        }
    }

    for (let i = 0; i < num; i++) {     
        // if undefined, copy other value in the array
        if (sources[i] === undefined) {
            sources[i] = temp_article;
        }
        // push each intake to the template object

        let intake = new Media_intake(sources[i], topic, issues[i], avg_time[i]);
        profile.push(intake);
    }

    // console.log(profile);
    return profile;
}

// get one random article
function getArticle(bias, cred) {
    let articles = [];
    let index = 0;

    for (let source_id of Object.keys(news)) {
        let side = news[source_id].side;
        let source_cred = news[source_id].credibility;

        if (bias === side) {
            if (cred === "low") {
                if (source_cred < 0.3) {
                    articles.push(source_id);
                }
            } else if (cred === "mid") {
                if (source_cred >= 0.3 && source_cred < 0.6) {
                    articles.push(source_id);
                }
            } else if (cred === "high") {
                if (source_cred >= 0.6) {
                    articles.push(source_id);
                }
            }
        }
    }

    if (articles.length > 0) {
        index = getRandomInt(0, articles.length - 1);
    } else {
        index = 0;
    }

    return articles[index];
}

// pick random issue
function getIssue(){
    let issue_list = issues.list;
    let issue = issue_list[getRandomInt(0, issue_list.length-1)];
    return issue;
}

// user's media intake object
function Media_intake(source, topic, issue, time){
    this.source = source;
    this.topic = topic;
    this.issue = issue;
    this.time = time;
}

function getRandomFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) * 0.1;
}

function getRandomInt(min, max) {
    return Math.round((Math.random() * (max - min) + min));
}

export { generateProfile };