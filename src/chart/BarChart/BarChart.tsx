import React, { useRef, useEffect, useState } from "react";
import "./BarChart.scss";
import * as d3 from "d3";

interface IBarChartProps {
  className?: string;
}

const data = [
  {
    date: new Date("2020-01-01"),
    value: 200,
  },
  {
    date: new Date("2020-01-02"),
    value: 30,
  },
  {
    date: new Date("2020-01-03"),
    value: 670,
  },
  {
    date: new Date("2020-01-04"),
    value: 124,
  },
  {
    date: new Date("2020-01-05"),
    value: 980,
  },
  {
    date: new Date("2020-01-06"),
    value: 300,
  },
];

const color = "#1850A8";

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 60,
  marginRight = 0;

const BarChart = (props: IBarChartProps) => {
  const { className } = props;

  const ref = useRef(null);
  const refContainer = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 200;

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];
    const svg = d3
      .select(".bar-chart svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const xScale = d3
      .scaleBand()
      .domain(d3.map(data, (d) => d.date))
      .range(xRange)
      .paddingInner(0.5)
      .paddingOuter(0.5);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range(yRange);
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
          .ticks(height / 60)
      )
      .call((g) => g.selectAll(".domain"))
      .call((g) => g.selectAll(".tick text").attr("x", -24))
      .call((g) => g.selectAll(".tick line").attr("x1", width));

    //ve line
    const xTop = d3
      .scaleLinear()
      .domain([0, data.length * 2 + 1])
      .range(xRange);
    svg
      .append("g")
      .call(
        d3
          .axisTop(xTop)
          .ticks(data.length * 2 + 1)
          .tickSize(0)
      )
      .call((g) => g.selectAll(".tick line").attr("y2", height - marginBottom))
      .call((g) => g.selectAll(".tick text").attr("opacity", 0));

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("transform", `translate(0, -${marginBottom})`)
      .attr("x", function (d) {
        return xScale(d.date);
      })
      .attr("y", function (d) {
        return yScale(0);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return height - yScale(0);
      })
      .attr("fill", color);

    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) {
        return yScale(d.value);
      })
      .attr("height", function (d) {
        return height - yScale(d.value);
      })
      .delay(function (d, i) {
        return i * 100;
      });

    return () => {
      d3.selectAll(".bar-chart g").remove();
    };
  }, [data]);

  return (
    <div ref={refContainer} className={`bar-chart ${className ? className : ""} `}>
      <p className="bar-chart__title" style={{ marginRight: `${marginRight}px` }}>
        Tất cả tin bài
      </p>
      <svg ref={ref}></svg>
    </div>
  );
};

export default BarChart;
