import * as d3 from 'd3';
import React from 'react';
import './chart.css';
import { Doughnut } from 'react-chartjs-2';

const COLORS = ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3", "#fe3f38", "#3b40f0", "#b10dc9"];

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.sample_data = {
            labels: ["sourceA", "sourceB", "sourceC"],
            datasets: [{data:[300, 50, 100],
            backgroundColor: ["#e91e63", "#ff4136", "#b10dc9"],
            hoverBackgroundColor:["#e91e63", "#ff4136", "#b10dc9"]}]
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