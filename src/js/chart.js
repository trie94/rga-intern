import * as d3 from "d3";
import './test.css';
import data from '../assets/data.csv';

// margin and radius
let margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;


// arc generator
let arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

let labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50)

let pie = d3.pie()
    .sort(null)
    .value((d)=>{return d.count;});

// define svg
let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

// import data
// d3.csv("./src/assets/data.csv", (error, data)=>{
//     if(error) throw error;

//     // parse the data
//     data.foreach((d)=>{
//         d.count = +d.count; // return numeric value
//         d.fruit = d.fruit;
//     });
let color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // append g elements (arc)
    let g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    // append the path of the arc
    g.append("path")
        .attr("d", arc)
        .style("fill", (d) => {return color(d.data.source)})

    // append the text (labels)
    g.append("text")
        .attr("transform", (d) =>{return "translate(" + labelArc.centroid(d) + ")";})
        .attr("dy", ".35em")
        .text((d) => {return d.data.source;});
//  });

