import * as d3 from 'd3';
import { selection } from 'd3-selection';
import React from 'react';
import './chart.css';
import data from '../../data/data.csv';

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const COLORS = ["#e91e63", "#ff4136", "#b10dc9", "#06a6f3", "#fe3f38", "#3b40f0", "#b10dc9"];

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.sample = [{ name: 'Group A', value: 100 }, { name: 'Group B', value: 50 },
        { name: 'Group C', value: 10 }, { name: 'Group D', value: 200 },
        { name: 'Group E', value: 30 }, { name: 'Group F', value: 80 }]
        this.dataKey = null;
    }

    render() {
        return (
            <div id="chart-container">
                <PieChart width={window.innerWidth} height={400}>
                    <Pie
                        isAnimationActive={true} data={this.sample} fill="#8884d8"
                        cx={window.innerWidth * 0.5} cy={200} innerRadius={40} outerRadius={80}
                        label paddingAngle={1}>
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} key={index} dataKey={this.sample[index]} />)
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        );
    }
}

export default Chart;

// function getSvg() {
//     let window_width = window.innerWidth;
//     let window_height = window.innerHeight;

//     // margin and radius
//     let margin = { top: 0, right: 0, bottom: 0, left: 0 },
//         width = window_width - margin.right - margin.left,
//         height = window_width - margin.top - margin.bottom,
//         radius = width / 4;

//     // arc generator
//     let arc = d3.arc()
//         .outerRadius(radius)
//         .innerRadius(radius * 1 / 4);

//     let labelArc = d3.arc()
//         .outerRadius(radius * 2 / 3)
//         .innerRadius(radius * 2 / 3)

//     let pie = d3.pie()
//         .sort(null)
//         .value((d) => { return d.count; });

//     let chart_container = d3.select("div.time-spent").append("div").attr("id", "chart-container");

//     // define svg
//     let svg = chart_container
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .attr("id", "pie-chart")
//         .append("g")
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     let color = d3.scaleOrdinal(["#fc443e", "#e62565", "#af22c6", "#5e5ddb", "#2097f1"]);

//     // append g elements (arc)
//     let g = svg.selectAll(".arc")
//         .data(pie(data))
//         .enter().append("g")
//         .attr("class", "arc");

//     // append the path of the arc
//     g.append("path")
//         .attr("d", arc)
//         .style("fill", (d) => { return color(d.data.source) })

//     // append the text (labels)
//     g.append("text")
//         .attr("transform", (d) => { return "translate(" + labelArc.centroid(d) + ")"; })
//         .attr("dy", ".35em")
//         .text((d) => { return d.data.source; });
// }
