import news from '../data/news-source.json';
import issues from '../data/issues.json';

// const BIAS = {
//     "left": left,
//     "mid-left": mid_left,
//     "center": center,
//     "mid-right": mid_right,
//     "right": right
// }

// const CREDIBILITY = {
//     "low": low,
//     "mid": mid,
//     "high": high
// }

function generateProfile(bias, cred, num, time){
    // distribute random time based on the avg time
    let avg_time = [];
    for (let i = 0; i < num; i ++){
        avg_time[i] = time + getRandomFloat(-1, 1);
        console.log(avg_time[i]);
    }
// e.g. if left, distribute total article to left side
}

function getRandomFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) * 0.1;
  }

generateProfile(1,1,5,3);

console.log(news);