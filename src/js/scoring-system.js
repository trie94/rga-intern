// 0 - 10
let converted_bias;
let converted_credibility;
let converted_time;

// flag did read?
let time_threshold = 3;
let total_score;

// multipliers
const B = 0.4;
const C = 0.5;
const T = 0.1;

function scoringSystem(bias, cred, time) {

    if (bias >= 0 && bias < 0.4) {
        converted_bias = (Math.round(Math.pow(bias, 2) * 100) * 0.01) * 100;
    } else if (bias >= 0.4 && bias < 0.7) {
        converted_bias = (Math.round(Math.pow(bias, 3) * 100) * 0.01) * 250;
    } else if (bias >= 0.7 && bias < 1.0) {
        converted_bias = (Math.round(Math.log10(bias * 10) * 100) * 0.01) * 100;
    } else {
        converted_bias = 100;
    }

    if (cred >= 0 && cred < 0.4) {
        converted_credibility = (Math.round(Math.pow(cred, 2) * 100) * 0.01) * 100;
    } else if (cred >= 0.4 && cred < 0.7) {
        converted_credibility = (Math.round(Math.pow(cred, 3) * 100) * 0.01) * 250;
    } else if (cred >= 0.7 && cred < 1.0) {
        converted_credibility = (Math.round(Math.log10(cred * 10) * 100) * 0.01) * 100;
    } else {
        converted_credibility = 100;
    }

    // convert sec to min
    time = Math.round((time / 60) * 100) * 0.01;

    // time 0 to 10
    if (time < time_threshold) {
        converted_time = 1 * Math.round((100 / (Math.pow(time_threshold, 2)) * Math.pow(time, 2)) * 100) * 0.01;
    } else {
        converted_time = 100;
    }

    // console.log("converted bias >>> ", converted_bias, "/", 100);
    // console.log("converted credibility >>> ", converted_credibility, "/", 100);
    // console.log("converted time >>> ", converted_time, "/", 100);

    converted_bias *= B;
    converted_credibility *= C;
    converted_time *= T;

    console.log(">>> report <<< ");
    console.log("time spent in min >>> ", time, "min");
    console.log("converted bias >>> ", converted_bias, "/", B * 100);
    console.log("converted credibility >>> ", converted_credibility, "/", C * 100);
    console.log("converted time >>> ", converted_time, "/", T * 100);

    let score = (converted_time + converted_bias + converted_credibility);
    score = (Math.round(score) * 100) * 0.01;
    console.log("total score >>>", score, "/", (B + C + T) * 10 * 10);
    console.log("\n");

    return score;
}

// a random guy
total_score = scoringSystem(0.3, 0.8, 200);
// // time is the same

// // biased person, with high credibility
// console.log("biased person, with high credibility");
// scoringSystem(0.3, 0.8, 200);

// // unbiased person, with high credibility
// console.log("unbiased person, with high credibility");
// scoringSystem(0.8, 0.8, 200);

// // biased person, with low credibility
// console.log("biased person, with low credibility");
// scoringSystem(0.3, 0.3, 200);

// // unbiased person, with low credibility
// console.log("unbiased person, with low credibility");
// scoringSystem(0.8, 0.3, 200);