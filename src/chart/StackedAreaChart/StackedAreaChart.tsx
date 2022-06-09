import React, { useRef, useEffect, useState } from "react";
import "./StackedAreaChart.scss";
import * as d3 from "d3";

interface IStackedAreaChartProps {
  className?: string;
}

const titles = ["Tin bài tiêu cực", "Tin bài tích cực", "Tin bài trung lập"];
const colors = ["#eb5757", "#27ae60", "#1850a8"];
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
    positive: 100,
    neutral: 90,
  },
  {
    date: new Date("2020-01-05"),
    negative: 20,
    positive: 80,
    neutral: 10,
  },
  {
    date: new Date("2020-01-06"),
    negative: 60,
    positive: 40,
    neutral: 100,
  },
  {
    date: new Date("2020-01-07"),
    negative: 60,
    positive: 100,
    neutral: 90,
  },
  {
    date: new Date("2020-01-08"),
    negative: 20,
    positive: 80,
    neutral: 10,
  },
  {
    date: new Date("2020-01-09"),
    negative: 60,
    positive: 40,
    neutral: 100,
  },
];

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 60,
  marginRight = 0;

const StackedAreaChart = (props: IStackedAreaChartProps) => {
  const { className } = props;

  const ref = useRef(null);
  const refContainer = useRef(null);

  useEffect(() => {
    //format data
    const yDoman = d3.max(
      data
        .map((el) => Object.values(el))
        .map((el) => el.splice(1))
        .map((el) => el.reduce((prev: number, curr: number) => prev + curr, 0))
    );

    const width = 900;
    const height = 300;

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];

    const svg = d3
      .select(".stacked-area-chart svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin slice")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const tooltip = d3.select(".stacked-area-chart__tooltip");

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range(xRange);
    const yScale = d3
      .scaleLinear()
      .domain([0, yDoman * 1.1])
      .range(yRange);

    //vẽ chục x
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .ticks(height / 40)
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
      .append("path")
      .attr("fill", (d, i) => colors[i])
      .attr(
        "d",
        d3
          .area()
          .x(function (d, i) {
            return xScale(d.data.date);
          })
          .y0(function (d) {
            return yScale(d[0]);
          })
          .y1(function (d) {
            return yScale(d[1]);
          })
      )
      .on("mousemove", (event, d) => {
        //console.log(d);
        d3.selectAll(`.${d.key}`).style("opacity", 1);
      })
      .on("mouseover", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 1);
      })
      .on("mouseleave", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 0);
      });

    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", "#ffffff")
      .attr("class", (d) => d.key)
      .on("mousemove", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 1);
        tooltip.style("visibility", "visible").style("background-color", colors[d.index]);
      })
      .on("mouseover", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 1);
        tooltip
          .style("left", `${event.x - 20}px`)
          .style("top", `${event.y - 50}px`)
          .style("background-color", colors[d.index]);
      })
      .on("mouseleave", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 0);
        tooltip.style("visibility", "hidden");
      })
      .style("opacity", 0)
      .selectAll("circle")
      // enter a second time = loop subgroup per subgroup to add all circleangles
      .data((d) => d)
      .join("circle")
      .attr("cx", (d) => xScale(d.data.date))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 10)
      .style("opacity", 0.4)
      .on("mousemove", (event, d) => {
        tooltip.html(`${d[1]}`);
      });

    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", (d, i) => colors[i])
      .attr("class", (d) => {
        return d.key;
      })
      .on("mousemove", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 1);
        console.log(colors[d.index]);
        tooltip.style("visibility", "visible").style("background-color", colors[d.index]);
      })
      .on("mouseover", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 1);
        tooltip
          .style("left", `${event.x - 20}px`)
          .style("top", `${event.y - 50}px`)
          .style("background-color", colors[d.index]);
      })
      .on("mouseleave", (event, d) => {
        d3.selectAll(`.${d.key}`).style("opacity", 0);
        tooltip.style("visibility", "hidden");
      })
      .style("opacity", 0)
      .selectAll("circle")
      // enter a second time = loop subgroup per subgroup to add all circleangles
      .data((d) => d)
      .join("circle")
      .attr("cx", (d) => xScale(d.data.date))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 6)
      .on("mousemove", (event, d) => {
        tooltip.html(`${d[1]}`);
      });

    return () => {
      d3.selectAll(".stacked-area-chart g").remove();
    };
  }, [data]);

  return (
    <div ref={refContainer} className={`stacked-area-chart ${className ? className : ""} `}>
      <p className="stacked-area-chart__title" style={{ marginRight: `${marginRight}px` }}>
        Tất cả tin bài
      </p>
      <div className="stacked-area-chart__tooltip"></div>
      <svg ref={ref}></svg>
      <ul className="stacked-area-chart__menu" style={{ marginTop: `${marginTop}px`, marginLeft: `${marginLeft}px` }}>
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

export default StackedAreaChart;
