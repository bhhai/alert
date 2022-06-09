import React, { useRef, useEffect } from "react";
import "./AreaChart.scss";
import * as d3 from "d3";

const data = [
  { date: "2020-01-01", value: 1500 },
  { date: "2020-01-02", value: 900 },
  { date: "2020-01-03", value: 1000 },
  { date: "2020-01-04", value: 2000 },
  { date: "2020-01-05", value: 390 },
  { date: "2020-01-06", value: 1900 },
  { date: "2020-01-07", value: 3000 },
  { date: "2020-01-08", value: 2500 },
  { date: "2020-01-09", value: 200 },
  { date: "2020-01-10", value: 1320 },
  { date: "2020-01-11", value: 200 },
  { date: "2020-01-12", value: 900 },
  { date: "2020-01-13", value: 1320 },
];

const color = "#1850A8";

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 60,
  marginRight = 0;

interface IAreaChartProps {
  className?: string;
}

const AreaChart = (props: IAreaChartProps) => {
  const {className} = props;
  const ref = useRef(null);
  const refContainer = useRef(null);
  useEffect(() => {
    const width = 900;
    const height = 400;

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];

    const svg = d3
      .select(".area-chart svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const yDomain = [0, d3.max(data, (d) => d.value)];
    const xDomain = d3.extent(data, (d) => new Date(d.date));

    const yScale = d3.scaleLinear().domain(yDomain).range(yRange);
    const xScale = d3.scaleUtc().domain(xDomain).range(xRange);

    //ve chuc toa do

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .ticks(width / 120)
      )
      .call((g) => g.select(".domain"))
      .call((g) => g.selectAll(".tick text").attr("y", 24))
      .call((g) => g.selectAll(".tick line").clone().attr("y1", -height));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0)
          .ticks(height / 80)
      )
      .call((g) => g.select(".domain"))
      .call((g) => g.selectAll(".tick text").attr("x", -24))
      .call((g) => g.selectAll(".tick line").clone().attr("x2", width));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url('#gradient')")
      .attr(
        "d",
        d3
          .area()
          .x(function (d) {
            return xScale(new Date(d.date));
          })
          .y0(yScale(0))
          .y1(function (d) {
            return yScale(d.value);
          })
      );

    //ve line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return xScale(new Date(d.date));
          })
          .y(function (d) {
            return yScale(d.value);
          })
      );
  }, []);
  return (
    <div ref={refContainer} className={`area-chart ${className ? className : ''} `}>
      <p className="area-chart__title" style={{ marginRight: `${marginRight * 2}px` }}>
        Số lượng tin bài
      </p>
      <svg ref={ref}>
        <defs>
          <linearGradient id={`gradient`} gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={color} stopOpacity={"100%"} />
            <stop offset="100%" stopColor={color} stopOpacity={"0%"} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AreaChart;
