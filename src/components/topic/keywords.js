import React from 'react';
import './keywords.css';
import news from '../../data/news-source.json';
import { user } from '../../data/user-data';

const COLORS = ["#354DF1", "#128DF3", "#476CE3", "#AE10CA", "#D2178E", "#ED255B", "#FA3841"];
let profile_data = user;
let issues = [];

console.log(user);

function getIssues() {
    for (let i = 0; i < profile_data.length; i++) {
        issues[i] = profile_data[i].issue;
    }

    reorderIssues(issues);
}

function reorderIssues(arr) {
    arr = arr.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });

    let temp_time = 0;
    let temp2_time = 0;
    let temp_issue = null;
    let temp2_issue = null;

    let reordered_arr = [];

    for (let i = 0; i < arr.length; i++) {

        temp_issue = null;
        temp_time = 0;

        for (let j = 0; j < profile_data.length; j++) {

            temp_issue = profile_data[j].issue.concat();

            if (temp_issue === arr[i]) {
                temp_time += profile_data[j].time;
                temp2_time = temp_time;
                temp2_issue = temp_issue.concat();
            }
        }

        if (temp_issue !== null && temp_time !== 0) {
            temp2_time = ((Math.round(temp2_time * 10)) * 0.1).toFixed(2);
            reordered_arr.push({ temp2_issue, temp2_time });
        }
    }

    for (let j = 0; j < reordered_arr.length - 1; j++) {
        for (let i = 0; i < reordered_arr.length - 1; i++) {
            if (reordered_arr[i].temp2_time < reordered_arr[i + 1].temp2_time) {
                let temp = reordered_arr[i + 1].temp2_time;
                reordered_arr[i + 1].temp2_time = reordered_arr[i].temp2_time;
                reordered_arr[i].temp2_time = temp;
            }
        }
    }

    console.log("for the bubble chart: ", reordered_arr);
    return reordered_arr;
}

getIssues();

class KeywordBubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.radius = [50, 50];
    }

    render() {
        return (
            <div className="keywords">
                <div className="bubblechart">
                    keyword bubbles
                </div>
            </div>
        );
    }
}

export default KeywordBubble;