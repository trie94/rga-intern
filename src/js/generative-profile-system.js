import news from '../data/news-source.json';
import issues from '../data/issues.json';

// news platform
let domain;

// politics, sports, health...
let topic;

// sub topics within the higher topic
let issue;

// time user spent on the domain
let time;

// an object that stores user's media intake
let media_intake = {
    "domain": domain,
    "topic": topic,
    "issue": issue,
    "time": time
};

console.log(news);