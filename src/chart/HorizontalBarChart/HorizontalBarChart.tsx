import React, { useRef, useEffect, useState } from "react";
import "./HorizontalBarChart.scss";
import * as d3 from "d3";

interface IHorizontalBarChartProps {
  className?: string;
}

const types = [
  {
    label: "Tất cả tin bài",
    value: "total",
    color: "#e0e0e0",
  },
  {
    label: "Tin bài tiêu cực",
    value: "negative",
    color: "#eb5757",
  },
  {
    label: "Tin bài tích cực",
    value: "positive",
    color: "#27ae60",
  },
  {
    label: "Tin bài trung lập",
    value: "neutral",
    color: "#1850a8cc",
  },
];

const data = [
  {
    group: "Nguồn 1",
    negative: 20,
    positive: 50,
    neutral: 30,
    total: 100,
  },
  {
    group: "Nguồn 2",
    negative: 10,
    positive: 80,
    neutral: 30,
    total: 120,
  },
  {
    group: "Nguồn 3",
    negative: 30,
    positive: 17.5,
    neutral: 40,
    total: 70,
  },
  {
    group: "Nguồn 4",
    negative: 60,
    positive: 40,
    neutral: 100,
    total: 200,
  },
];

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 100,
  marginRight = 0;

const HorizontalBarChart = (props: IHorizontalBarChartProps) => {
  const { className } = props;

  const ref = useRef(null);
  const refContainer = useRef(null);

  const [selected, setSelected] = useState("positive");

  useEffect(() => {
    const width = 900;
    const height = 400;

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];
    const svg = d3
      .select(".horizontal-bar-chart svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const max = d3.max(data.map((el: any) => el.total));
    const xScale = d3.scaleLinear().domain([0, max]).range(xRange);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .call((g) => g.select(".domain"))
      .call((g) => g.selectAll(".tick text").attr("y", 22))
      .call((g) => g.selectAll(".tick line").clone().attr("y1", -height).attr("opacity", 1));

    const yScale = d3
      .scaleBand()
      .domain(data.map((d: any) => d.group))
      .range(yRange)
      .padding(0.5);

    svg
      .selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (d) => yScale(d.group))
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", "#E0E0E0")
      .transition()
      .duration(800)
      .attr("width", (d) => xScale(d.total));

    svg
      .selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (d) => yScale(d.group))
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", types.find((el: any) => el.value === selected).color)
      .transition()
      .duration(1000)
      .attr("width", (d) => xScale(d[selected]));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale).tickSize(0))
      .call((g) => g.selectAll(".tick text").attr("x", -13));

    return () => {
      d3.selectAll(".horizontal-bar-chart g").remove();
    };
  }, [selected]);

  return (
    <div ref={refContainer} className={`horizontal-bar-chart ${className ? className : ""} `}>
      <p className="horizontal-bar-chart__title">Tất cả tin bài</p>
      <svg ref={ref}></svg>
      <ul className="horizontal-bar-chart__menu">
        {types.map((el, i) => (
          <li
            key={i}
            className={`${selected === el.value ? `horizontal-bar-chart--${el.value}` : ""} `}
            onClick={() => el.value !== "total" && setSelected(el.value)}
          >
            <span></span>
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorizontalBarChart;
