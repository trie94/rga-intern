import React from 'react';
import './chart.css';
import { Doughnut } from 'react-chartjs-2';
import data from '../../data/data.json';
import { generateProfile } from '../../js/generative-profile-system';

// const COLORS = ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3", "#fe3f38", "#3b40f0", "#b10dc9"];
let profile_data = generateProfile("left", "mid", 20, 5);
let top1_source, top2_source, top3_source, top4_source;
let top1_time = 0, top2_time = 0, top3_time = 0, top4_time = 0;

// console.log(profile_data);

// profile_data.map((index) => { console.log(index.source) });

let top_sources = [];

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

    let reordered_arr = [];

    for (let i = 0; i < arr.length; i++) {

        temp_source = null;
        temp_time = 0;

        for (let j = 0; j < profile_data.length; j++) {

            temp_source = profile_data[j].source.concat();

            if (temp_source === arr[i]) {
                temp_time += profile_data[j].time;
                // console.log(temp_source, temp_time);
                temp2_time = temp_time;
                temp2_source = temp_source.concat();
            }
        }

        if (temp_source !== null && temp_time !== 0) {
            reordered_arr.push({temp2_source, temp2_time});
        }
    }

    for (let j = 0; j < reordered_arr.length - 1; j++) {
        for (let i = 0; i < reordered_arr.length - 1; i++) {
            if (reordered_arr[i].temp2_time < reordered_arr[i+1].temp2_time) {
                let temp = reordered_arr[i+1].temp2_time;
                reordered_arr[i+1].temp2_time = reordered_arr[i].temp2_time;
                reordered_arr[i].temp2_time = temp;
            }
        }
    }

    console.log("hey hey hey", reordered_arr);
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

    console.log("top1_source: ", top1_source);
    console.log("top2_source: ", top2_source);
    console.log("top3_source: ", top3_source);
};

getSources();

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.labels = [top1_source, top2_source, top3_source];
        this.data = [top1_time, top2_time, top3_time];
        this.colors = [];

        this.sample_data = {
            labels: [this.labels[0], this.labels[1], this.labels[2]],
            datasets: [{
                data: [this.data[0], this.data[1], this.data[2]],
                backgroundColor: ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3"],
                hoverBackgroundColor: ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3"]
            }]
        }
    }

    render() {
        return (
            <div id="chart-container">
                <Doughnut data={this.sample_data} />
            </div>
        );
    }
}

export default Chart;