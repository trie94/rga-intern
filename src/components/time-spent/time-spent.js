import React from 'react';
import './time-spent.css';
import { Doughnut } from 'react-chartjs-2';
import news from '../../data/news-source.json';

const COLORS = ["#354DF1", "#128DF3", "#476CE3", "#AE10CA", "#D2178E", "#ED255B", "#FA3841"];

class TimeSpent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile,
            top1_source: "",
            top2_source: "",
            top3_source: "",
            top1_time: 0,
            top2_time: 0,
            top3_time: 0,
            color_1: "",
            color_2: "",
            color_3: "",
            labels: [],
            time: [],
            data: {}
        }

        this.getSources = this.getSources.bind(this);
        this.reorderSources = this.reorderSources.bind(this);
        this.getRank = this.getRank.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getTotalTime = this.getTotalTime.bind(this);
        this.getPieChart = this.getPieChart.bind(this);

        this.radius = window.innerWidth * 0.01;

        this.options = {
            legend: {
                display: false,
                position: 'bottom'
            },
            responsive: true,
        }
    }

    componentWillMount() {
        this.getSources(this.props.profile);
        this.setState({
            top1_source: this.top1_source,
            top2_source: this.top2_source,
            top3_source: this.top3_source,
            time: this.getTotalTime(),
        });
        this.state.color_1 = this.getColor(this.state.top1_source);
        this.state.color_2 = this.getColor(this.state.top2_source);
        this.state.color_3 = this.getColor(this.state.top3_source);
        this.state.data = this.getPieChart();
    }

    componentDidUpdate() {
        if (this.state.profile !== this.props.profile) {
            this.getSources(this.props.profile);
            this.setState({
                profile: this.props.profile,
                top1_source: this.top1_source,
                top2_source: this.top2_source,
                top3_source: this.top3_source,
                time: this.getTotalTime()
            });
            this.state.color_1 = this.getColor(this.state.top1_source);
            this.state.color_2 = this.getColor(this.state.top2_source);
            this.state.color_3 = this.getColor(this.state.top3_source);
            this.state.data = this.getPieChart();
        }
    }

    getPieChart() {
        let dataObj = {
            labels: [this.state.top1_source.replace(/_/g, ' '), this.state.top2_source.replace(/_/g, ' '), this.state.top3_source.replace(/_/g, ' ')],
            datasets: [{
                data: [this.state.top1_time, this.state.top2_time, this.state.top3_time],
                backgroundColor: [this.state.color_1, this.state.color_2, this.state.color_3],
                hoverBackgroundColor: [this.state.color_1, this.state.color_2, this.state.color_3]
            }]
        };
        return dataObj;
    }

    // get top 3 sources
    getSources(arr) {
        let top_sources = [];
        for (let i = 0; i < arr.length; i++) {
            top_sources[i] = arr[i].source;
        }
        this.getRank(this.reorderSources(top_sources));
    }

    reorderSources(arr) {

        arr = arr.filter((elem, index, self) => {
            return index === self.indexOf(elem);
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

            for (let j = 0; j < this.props.profile.length; j++) {

                temp_source = this.props.profile[j].source.concat();

                if (temp_source === arr[i]) {
                    temp_time += this.props.profile[j].time;
                    // console.log(temp_source, temp_time);
                    temp2_time = temp_time;
                    temp2_source = temp_source.concat();
                    temp_issue = this.props.profile[j].issue.concat();
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

        return reordered_arr;
    }

    getRank(arr) {
        this.state.top1_source = arr[0].temp2_source;
        this.state.top1_time = arr[0].temp2_time;
        this.state.top2_source = arr[1].temp2_source;
        this.state.top2_time = arr[1].temp2_time;
        this.state.top3_source = arr[2].temp2_source;
        this.state.top3_time = arr[2].temp2_time;
    };

    getColor(source) {
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

    getTotalTime() {
        let total_time = 0;
        let hour = 0;
        let min = 0;
        let time = [];


        for (let i = 0; i < this.state.profile.length; i++) {
            total_time += this.state.profile[i].time;
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

    render() {
        return (
            <div id="time-spent-container" className="component-container">
                <p className="titles total-time-spent">TOTAL TIME SPENT</p>
                <div className="time-spent">
                    <Doughnut data={this.state.data} options={this.options} />
                </div>
                <p className="total-time">TOTAL: {this.state.time[0]} HOURS {this.state.time[1]} MINUTES</p>
                <div className="label-container">
                    <div className="source-container">
                        <svg width={this.radius * 2} height={this.radius * 2} className="circles"><circle cx={this.radius} cy ={this.radius} r={this.radius} fill={this.state.color_1} /></svg>
                        <p className="source-labels">{this.state.data.labels[0].replace(/_/g, ' ')}</p>
                    </div>
                    <div className="source-container">
                        <svg width={this.radius * 2} height={this.radius * 2} className="circles"><circle cx={this.radius} cy ={this.radius} r={this.radius} fill={this.state.color_2} /></svg>
                        <p className="source-labels">{this.state.data.labels[1].replace(/_/g, ' ')}</p>
                    </div>
                    <div className="source-container">
                        <svg width={this.radius * 2} height={this.radius * 2} className="circles"><circle cx={this.radius} cy ={this.radius} r={this.radius} fill={this.state.color_3} /></svg>
                        <p className="source-labels">{this.state.data.labels[2].replace(/_/g, ' ')}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeSpent;