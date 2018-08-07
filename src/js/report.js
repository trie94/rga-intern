import { extractComponent, getEachMediaScore } from './scoring-system';

function getAvgScore(profile) {

    let scores = [];
    let total_score = 0;
    let avg_score = 0;

    for (let i = 0; i < profile.length; i++) {
        scores[i] = getEachMediaScore(extractComponent(profile[i]).bias, extractComponent(profile[i]).cred, extractComponent(profile[i]).time);
        total_score += scores[i];
    }

    avg_score = (Math.round(total_score / profile.length) * 100) * 0.01;
    return avg_score;
}

function getTotalTime(profile){

    let times = [];
    let total_time = 0;

    for (let i = 0; i < profile.length; i++) {
        times[i] = extractComponent(profile[i]).time;
        total_time += times[i];
    }

    return (Math.round(total_time) * 100) * 0.01;
}

function getReport(profile){

    console.log(">>>>>>> report <<<<<<<");
    console.log("total time >>> ", getTotalTime(profile), "min");
    console.log("score >>> ", getAvgScore(temp_profile), "/100");

    console.log("\n");
    console.log("topic: ", profile[0].topic);
    console.log("\n-------history-------")


    for (let i = 0; i < profile.length; i ++){
        console.log(profile[i].source, " | ", profile[i].issue, " | ", profile[i].time, "min");
    }
}

export { getAvgScore, getTotalTime, getReport };