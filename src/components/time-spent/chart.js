import React from 'react';
import './chart.css';
import { Doughnut } from 'react-chartjs-2';
import data from '../../data/data.json';

// const COLORS = ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3", "#fe3f38", "#3b40f0", "#b10dc9"];

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.labels = [data.source1, data.source2, data.source3, data.source4];
        this.data = [];
        this.colors = [];
        
        this.sample_data = {
            labels: [this.labels[0], this.labels[1], this.labels[2], this.labels[3]],
            datasets: [{data:[300, 50, 100, 20],
            backgroundColor: ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3"],
            hoverBackgroundColor:["#e91e63", "#ff4136", "#b10dc9", "#06a6f3"]}]
        }
    }

    render(){
        return(
            <div id="chart-container">
            <Doughnut data={this.sample_data} />
            </div>
        );
    }
}

export default Chart;