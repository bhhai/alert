import React, { useEffect } from "react";
import "./MultiBarChart.scss";
import * as d3 from "d3";

const data = [
  {
    name: "dự án 1",
    "tổng số tin bài": 1900,
    "tin bài tích cực": 877,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 2",
    "tổng số tin bài": 1800,
    "tin bài tích cực": 217,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 3",
    "tổng số tin bài": 2300,
    "tin bài tích cực": 671,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 4",
    "tổng số tin bài": 2615,
    "tin bài tích cực": 327,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 5",
    "tổng số tin bài": 1265,
    "tin bài tích cực": 212,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 6",
    "tổng số tin bài": 1897,
    "tin bài tích cực": 122,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 7",
    "tổng số tin bài": 2141,
    "tin bài tích cực": 121,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 8",
    "tổng số tin bài": 1213,
    "tin bài tích cực": 71,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
  {
    name: "dự án 9",
    "tổng số tin bài": 1112,
    "tin bài tích cực": 11,
    "hệ số lan toả": 1.2,
    "chỉ số ô nhiễm": 0.5,
  },
];

const color = "#EB5757";
const marginTop = 50,
  marginBottom = 40,
  marginLeft = 80,
  marginRight = 0;

const MultiBarChart = () => {
  useEffect(() => {
    const width2 = 800;
    const height2 = 400;

    const xRange2 = [marginLeft, width2 - marginRight];
    const yRange2 = [height2 - marginBottom, marginTop];

    const width = 500;
    const height = 250;

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];

    const dataSort = data.sort((a, b) => (a["tin bài tích cực"] < b["tin bài tích cực"] ? 1 : -1));
    const dataTop = dataSort.slice(0, 3);
    const dataNormal = dataSort.slice(3);

    console.log(dataTop, dataNormal);

    const svgTop = d3
      .select(".multi-bar-chart svg.multi-bar-chart__top")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const xTopScale = d3
      .scaleBand()
      .domain(d3.map(dataTop, (d) => d.name))
      .range(xRange)
      .paddingInner(0.3);

    const yTopScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataTop, (d) => d["tin bài tích cực"])])
      .range(yRange);

    svgTop
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xTopScale).tickSize(0))
      .call((g) => g.select(".domain").style("opacity", 0))
      .call((g) => g.selectAll(".tick text").attr("y", 24));
    svgTop
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(
        d3
          .axisLeft(yTopScale)
          .tickSize(0)
          .ticks(height / 60)
      )
      .call((g) => g.select(".domain").style("opacity", 0))
      .call((g) => g.selectAll(".tick").style("opacity", 0));

    svgTop
      .append("g")
      .selectAll("rect")
      .data(dataTop)
      .join("rect")
      .attr("transform", `translate(0, -${marginBottom})`)
      .attr("x", (d) => xTopScale(d.name))
      .attr("y", (d) => yTopScale(d["tin bài tích cực"]))
      .attr("width", xTopScale.bandwidth())
      .attr("height", (d) => height - yTopScale(d["tin bài tích cực"]))
      .attr("fill", "url('#gradient')")
      .attr("rx", 10)

    const svgNormal = d3
      .select(".multi-bar-chart svg.multi-bar-chart__normal")
      .attr("width", width2)
      .attr("height", height2)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width2, height2])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const yNormalScale = d3
      .scaleBand()
      .domain(d3.map(dataNormal, (d) => d.name))
      .range(yRange2)
      .paddingInner(0.2);

    const xNormalScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataNormal, (d) => d["tổng số tin bài"])])
      .range(xRange2);

    svgNormal
      .append("g")
      .attr("transform", `translate(0, ${height2 - marginBottom})`)
      .call(d3.axisBottom(xNormalScale).tickSize(0))
      .call((g) => g.select(".domain").style("opacity", 0))
      .call((g) => g.selectAll(".tick text").style("opacity", 0));

    svgNormal
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yNormalScale).tickSize(0))
      .call((g) => g.selectAll(".tick text").attr("x", -13))
      .call((g) => g.select(".domain").style("opacity", 0));

    svgNormal
      .append("g")
      .selectAll("rect")
      .data(dataNormal)
      .join("rect")
      .attr("x", (d) => xNormalScale(0))
      .attr("y", (d) => yNormalScale(d.name))
      .attr("width", (d) => xNormalScale(d["tổng số tin bài"]))
      .attr("height", (d) => yNormalScale.bandwidth())
      .attr("fill", "#E0E0E0");

    const rx = 12;
    const ry = 12;

    svgNormal
      .append("g")
      //.selectAll("g")
      .selectAll("rect")
      .data(dataNormal)
      .join("rect")
      //.enter().append("path")
    //   .attr("d", d => `
    //     M${yNormalScale(d.name)},${xNormalScale(d["tin bài tích cực"]) + ry}
    //     a${rx},${ry} 0 0 1 ${rx},${-ry}
    //     h${yNormalScale.bandwidth() - 2 * rx}
    //     a${rx},${ry} 0 0 1 ${rx},${ry}
    //     v${height - xNormalScale(d["tin bài tích cực"]) - ry}
    //     h${-(yNormalScale.bandwidth())}Z
    //   `)
        .join("rect")
        .attr("x", (d) => xNormalScale(0))
        .attr("y", (d) => yNormalScale(d.name))
        .attr("width", (d) => xNormalScale(d["tin bài tích cực"]))
        .attr("height", (d) => yNormalScale.bandwidth())
      .attr("fill", "url('#gradient')")
      .attr("rx", 7)
  }, [data]);
  return (
    <div className={`multi-bar-chart`}>
      <svg className="multi-bar-chart__top">
        <defs>
          <linearGradient id={`gradient`} gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={color} stopOpacity={"100%"} />
            <stop offset="100%" stopColor={color} stopOpacity={"88%"} />
          </linearGradient>
        </defs>
      </svg>
      <svg className="multi-bar-chart__normal"></svg>
    </div>
  );
};

export default MultiBarChart;
