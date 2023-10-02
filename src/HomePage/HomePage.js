import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import * as d3 from "d3";
import { pie, arc } from "d3-shape";
import { scaleOrdinal } from "d3-scale";

let myChart;

function HomePage() {
  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ff0000",
          "#f2ff00",
          "#11ff00",
          "#00ffff",
          "#1e00ff",
          "#ff00ff",
          "#7c5e32",
          "#8b95ae",//0d1b35
        ],
      },
    ],
    labels: [],
  };

  function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new ChartJS(ctx, {
      type: "pie",
      data: dataSource,
      options: {
        responsive: false, // Add this line to make the chart non-responsive
        maintainAspectRatio: false, // Add this line to maintain aspect ratio
      },  
    });
  }

  function getBudget() {
    axios
      .get("/budget-data.json")
      .then(function (res) {
        console.log(res);
        for (var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
        }
        createChart();
        createD3Chart(res.data.myBudget);
      })
      .catch(function (error) {
        console.error("Error fetching budget data: ", error);
      });
  }

  const svgRef = useRef(null);

  function createD3Chart(data) {
    const svg = d3.select(svgRef.current);

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6; // Set the inner radius to create a hollow center

    svg.attr("width", width).attr("height", height);

    const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.title))
        .range([
            "#ff0000",
            "#f2ff00",
            "#11ff00",
            "#00ffff",
            "#1e00ff",
            "#ff00ff",
            "#7c5e32",
            "#8b95ae",
        ]);

    const pieGenerator = d3.pie().value((d) => d.budget);

    const arcs = pieGenerator(data);

    const arcGenerator = d3.arc()
        .innerRadius(innerRadius) // Use the innerRadius to create a hollow center
        .outerRadius(radius);

    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    const g = svg
        .selectAll(".arc")
        .data(arcs)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    g.append("path")
        .attr("d", arcGenerator)
        .style("fill", (d) => color(d.data.title));

    g.append("text")
        .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .text((d) => d.data.title);
}


  useEffect(() => {
    console.log("useEffect is running!");
    getBudget();
  }, []);

  return (
    <main id="main-content">
      <div className="container center">
        <article className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they live happier lives... since they
            spend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="text-box">
          <h1>Free</h1>
          <p>This app is free! And you are the only one holding your data!</p>
        </article>
        <article className="chart1">
          <h1>Chart</h1>
          <canvas id="myChart" width="450" height="450" className="chart-canvas"></canvas>
        </article>
        <article className="d3js-chart">
          <h1>D3JS Chart</h1>
          <svg ref={svgRef} width={400} height={400} className="d3chart-canvas"></svg>
        </article>
      </div>
    </main>
  );
}

export default HomePage;