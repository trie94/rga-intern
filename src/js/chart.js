import * as d3 from "d3";
import './test.css';
import data from '../data/data.csv';
import dataJson from '../data/data.json';

// margin and radius
let margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width / 2;

// arc generator
let arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 140);

let labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50)

let pie = d3.pie()
    .sort(null)
    .value((d) => { return d.count; });

// define svg
let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

let color = d3.scaleOrdinal(["#fc443e", "#e62565", "#af22c6", "#5e5ddb", "#2097f1"]);

// append g elements (arc)
let g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

// append the path of the arc
g.append("path")
    .attr("d", arc)
    .style("fill", (d) => { return color(d.data.source) })

// append the text (labels)
g.append("text")
    .attr("transform", (d) => { return "translate(" + labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text((d) => { return d.data.source; });
//  });

