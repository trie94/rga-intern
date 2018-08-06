import React from 'react';
import './chart.css';
import { Doughnut } from 'react-chartjs-2';
import data from '../../data/data.json';
import { generateProfile } from '../../js/generative-profile-system';

// const COLORS = ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3", "#fe3f38", "#3b40f0", "#b10dc9"];
let profile_data = generateProfile("left", "mid", 20, 5);
let top1_source, top2_source, top3_source, top4_source;
let top1_time = 0, top2_time = 0, top3_time = 0, top4_time = 0;

console.log(profile_data);

// profile_data.map((index) => { console.log(index.source) });
let top_sources = [];

// get top 4 sources
function getSources(){
    for (let i = 0; i < profile_data.length; i++) {
        top_sources[i] = profile_data[i].source;
    }
    console.log("get sources");
}

function filterSources(arr) {
    top_sources = arr.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });
    console.log(top_sources);
}

function rankSources(arr) {
    if(top_sources[0] !== null || top_sources[0] !== undefined){
        top1_source = arr[0];
    }
    if(top_sources[1] !== null || top_sources[1] !== undefined){
        top2_source = arr[1];
    }
    if(top_sources[2] !== null || top_sources[2] !== undefined){
        top3_source = arr[2];
    }

    console.log("top1_source: ", top1_source);
    console.log("top2_source: ", top2_source);
    console.log("top3_source: ", top3_source);
};

getSources();
filterSources(top_sources);
rankSources(top_sources);

// get time
for (let key of Object.keys(profile_data)) {
    if (profile_data[key].source === top1_source) {
        top1_time += profile_data[key].time;
    } else if (profile_data[key].source === top2_source) {
        top2_time += profile_data[key].time;
    } else if (profile_data[key].source === top3_source) {
        top3_time += profile_data[key].time;
    }
}

console.log(top1_time);

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.labels = [top1_source, top2_source, top3_source, top4_source];
        this.data = [top1_time, top2_time, top3_time, top4_time];
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