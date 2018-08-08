import React from 'react';
import './time-spent.css';
import { Doughnut } from 'react-chartjs-2';
import news from '../../data/news-source.json';
import { user } from '../../data/user-data';

const COLORS = ["#354DF1", "#128DF3", "#476CE3", "#AE10CA", "#D2178E", "#ED255B", "#FA3841"];
let profile_data = user;
let top1_source, top2_source, top3_source;
let top1_time = 0, top2_time = 0, top3_time = 0;

let top_sources = [];
console.log(user);

// get top 3 sources
function getSources() {
    for (let i = 0; i < profile_data.length; i++) {
        top_sources[i] = profile_data[i].source;
    }
    getRank(reorderSources(top_sources));
}

function reorderSources(arr) {

    arr = arr.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });

    let temp_time = 0;
    let temp2_time = 0;
    let temp_source = null;
    let temp2_source = null;
    let temp_issue;
    let temp2_issues = [];

    let reordered_arr = [];

    for (let i = 0; i < arr.length; i++) {

        temp_source = null;
        temp_time = 0;
        temp2_issues = [];

        for (let j = 0; j < profile_data.length; j++) {

            temp_source = profile_data[j].source.concat();

            if (temp_source === arr[i]) {
                temp_time += profile_data[j].time;
                // console.log(temp_source, temp_time);
                temp2_time = temp_time;
                temp2_source = temp_source.concat();
                temp_issue = profile_data[j].issue.concat();
                temp2_issues.push(temp_issue);
            }
        }

        if (temp_source !== null && temp_time !== 0) {
            temp2_time = ((Math.round(temp2_time * 10)) * 0.1).toFixed(1);
            reordered_arr.push({ temp2_source, temp2_time, temp2_issues });
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

    console.log(reordered_arr);
    return reordered_arr;
}

function getRank(arr) {
    if (top_sources[0] !== null || top_sources[0] !== undefined) {
        top1_source = arr[0].temp2_source;
        top1_time = arr[0].temp2_time;
    }
    if (top_sources[1] !== null || top_sources[1] !== undefined) {
        top2_source = arr[1].temp2_source;
        top2_time = arr[1].temp2_time;
    }
    if (top_sources[2] !== null || top_sources[2] !== undefined) {
        top3_source = arr[2].temp2_source;
        top3_time = arr[2].temp2_time;
    }
};

function getColor(source) {
    let color;

    for (let source_id of Object.keys(news)) {
        let name = news[source_id].name;
        let side = news[source_id].side;

        if (source === source_id) {

            switch (side) {
                case "far_left":
                    color = COLORS[0];
                    break;

                case "left":
                    color = COLORS[1];
                    break;

                case "mid_left":
                    color = COLORS[2];
                    break;

                case "center":
                    color = COLORS[3];
                    break;

                case "mid_right":
                    color = COLORS[4];
                    break;

                case "right":
                    color = COLORS[5];
                    break;

                case "far_right":
                    color = COLORS[6];
                    break;
            }
        }
    }
    return color;
}

function getTotalTime() {
    let total_time = 0;
    let hour = 0;
    let min = 0;
    let time = [];

    for (let i = 0; i < profile_data.length; i++) {
        total_time += profile_data[i].time;
    }

    if (total_time >= 60) {
        hour = Math.round(total_time / 60);
        min = Math.round(total_time % 60);
    } else {
        hour = 0;
        min = total_time;
    }

    time[0] = hour;
    time[1] = min;
    return time;
}

getSources();
getTotalTime();

class TimeSpent extends React.Component {
    constructor(props) {
        super(props);
        this.labels = [top1_source, top2_source, top3_source];
        this.time = [top1_time, top2_time, top3_time];
        this.radius = window.innerWidth * 0.01;

        this.data = {
            labels: [this.labels[0], this.labels[1], this.labels[2]],
            datasets: [{
                data: [this.time[0], this.time[1], this.time[2]],
                backgroundColor: [getColor(this.labels[0]), getColor(this.labels[1]), getColor(this.labels[2])],
                hoverBackgroundColor: [getColor(this.labels[0]), getColor(this.labels[1]), getColor(this.labels[2])]
            }]
        }

        this.hour = getTotalTime()[0];
        this.min = getTotalTime()[1];

        this.options = {
            legend: {
                display: false,
                position: 'bottom'
            },
            responsive: true,
        }
    }

    render() {
        return (
            <div id="time-spent-container" className="component-container">
                <p className="titles">TOTAL TIME SPENT</p>
                <div className="time-spent">
                    <Doughnut data={this.data} options={this.options} />
                </div>
                <p className="titles">TOTAL: {this.hour} HOURS {this.min} MINUTES</p>
                <div className="label-container">
                    <div className="source-container">
                        <svg width={this.radius * 2} height={this.radius * 2} className="circles"><circle cx={this.radius} cy ={this.radius} r={this.radius} fill={getColor(this.labels[0])} /></svg>
                        <p className="source-labels">{this.labels[0]}</p>
                    </div>
                    <div className="source-container">
                        <svg width={this.radius * 2} height={this.radius * 2} className="circles"><circle cx={this.radius} cy ={this.radius} r={this.radius} fill={getColor(this.labels[1])} /></svg>
                        <p className="source-labels">{this.labels[1]}</p>
                    </div>
                    <div className="source-container">
                        <svg width={this.radius * 2} height={this.radius * 2} className="circles"><circle cx={this.radius} cy ={this.radius} r={this.radius} fill={getColor(this.labels[2])} /></svg>
                        <p className="source-labels">{this.labels[2]}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeSpent;