import React, { useRef, useEffect, useState } from "react";
import "./StackedBarChart.scss";
import * as d3 from "d3";

interface IStackedBarChartProps {
  className?: string;
}

const titles = ["Tin bài tiêu cực", "Tin bài tích cực", "Tin bài trung lập"];
const colors = ["#eb5757", "#27ae60", "#1850a8", "#e0e0e0"];
const data = [
  {
    date: new Date("2020-01-01"),
    negative: 20,
    positive: 50,
    neutral: 30,
  },
  {
    date: new Date("2020-01-02"),
    negative: 10,
    positive: 80,
    neutral: 30,
  },
  {
    date: new Date("2020-01-03"),
    negative: 30,
    positive: 17.5,
    neutral: 40,
  },
  {
    date: new Date("2020-01-04"),
    negative: 60,
    positive: 50,
    neutral: 90,
  },
  {
    date: new Date("2020-01-05"),
    negative: 10,
    positive: 60,
    neutral: 10,
  },
  {
    date: new Date("2020-01-06"),
    negative: 60,
    positive: 40,
    neutral: 100,
  },
];

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 60,
  marginRight = 0;

const StackedBarChart = (props: IStackedBarChartProps) => {
  const { className } = props;

  const ref = useRef(null);
  const refContainer = useRef(null);

  useEffect(() => {
    const width = 900;
    const height = 500;

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];

    const svg = d3
      .select(".stacked-bar-chart svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const xScale = d3
      .scaleBand()
      .domain(d3.map(data, (d) => d.date))
      .rangeRound(xRange)
      .paddingInner(0.5)
      .paddingOuter(0.5);
    const yScale = d3.scaleLinear().domain([0, 300]).range(yRange);
    //vẽ chục x
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .tickFormat(d3.timeFormat(`Tuần ${"%W"}, tháng ${"%m"}`))
      )
      .call((g) => g.selectAll(".domain"))
      .call((g) => g.selectAll(".tick text").attr("y", 24));

    //vẽ chục y
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0)
          .ticks(height / 40)
      )
      .call((g) => g.selectAll(".tick line").clone().attr("x2", width))
      .call((g) => g.selectAll(".domain"))
      .call((g) => g.selectAll(".tick text").attr("x", -24));

    const keys = Object.keys(data[0]).splice(1);

    const stackedData = d3.stack().keys(keys)(data);

    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", (d, i) => colors[i])
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => xScale(d.data.date))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .transition()
      .ease(d3.easeLinear)
      .duration(700)
      .delay((d, i) => i * 50)
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

    return () => {
      d3.selectAll(".stacked-bar-chart g").remove();
    };
  }, [data]);

  return (
    <div ref={refContainer} className={`stacked-bar-chart ${className ? className : ""} `}>
      <p className="stacked-bar-chart__title" style={{ marginRight: `${marginRight}px` }}>
        Tất cả tin bài
      </p>
      <svg ref={ref}></svg>
      <ul className="stacked-bar-chart__menu" style={{ marginTop: `${marginBottom}px`, marginLeft: `${marginLeft}px` }}>
        {titles.map((el, index) => (
          <li key={index}>
            <span style={{ backgroundColor: colors[index] }}></span>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StackedBarChart;
