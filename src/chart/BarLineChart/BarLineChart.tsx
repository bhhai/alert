import React, { useRef, useEffect, useState } from "react";
import "./BarLineChart.scss";
import * as d3 from "d3";

interface IBarLineChartProps {
  className?: string;
}

const data = [
  {
    date: new Date("2020-01-01"),
    negative: 100,
    total: 200,
  },
  {
    date: new Date("2020-01-02"),
    negative: 230,
    total: 320,
  },
  {
    date: new Date("2020-01-03"),
    negative: 210,
    total: 670,
  },
  {
    date: new Date("2020-01-04"),
    negative: 40,
    total: 124,
  },
  {
    date: new Date("2020-01-05"),
    negative: 380,
    total: 1080,
  },
  {
    date: new Date("2020-01-06"),
    negative: 90,
    total: 300,
  },
];

const colorLine = "#EB5757";
const colorBar = "#1850A8";

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 60,
  marginRight = 0;

const chart = () => {
  const width = 900;
  const height = 500;

  const xRange = [marginLeft, width - marginRight];
  const yRange = [height - marginBottom, marginTop];

  const svg = d3
    .select(".barline-chart svg")
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
    .domain([0, d3.max(data, (d) => d.total)])
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
        .ticks(height / 80)
    )
    .call((g) => g.selectAll(".domain"))
    .call((g) => g.selectAll(".tick text").attr("x", -24))
    .call((g) => g.selectAll(".tick line").attr("x1", width));

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
    .attr("fill", colorBar);

  svg
    .selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return yScale(d.total);
    })
    .attr("height", function (d) {
      return height - yScale(d.total);
    })
    .delay(function (d, i) {
      return i * 100;
    });
  //vẽ line
  svg
    .append("path")
    .datum(data)
    .attr(
      "d",
      d3
        .line()
        .x((d, i) => {
          return xScale(d.date) + xScale.bandwidth() / 2;
          //return xScale(d.date)
        })
        .y((d) => yScale(d.negative))
    )
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", colorLine)
    .call(transition)
    .on("mousemove", (event, d) => {
      d3.selectAll("circle").style("opacity", 1);
    })
    .on("mouseover", (event, d) => {
      d3.selectAll("circle").style("opacity", 1);
    })
    .on("mouseleave", (event, d) => {
      d3.selectAll("circle").style("opacity", 0);
    });

  var area = d3
    .area()
    .x(function (d) {
      return xScale(d.date) + xScale.bandwidth() / 2;
    })
    .y0(yScale(0))
    .y1(function (d) {
      return yScale(d.negative);
    });
  svg
    .append("path")
    .datum(data)
    .attr("fill", "url('#gradient')")
    .attr("d", area)
    .on("mousemove", (event, d) => {
      d3.selectAll("circle").style("opacity", 1);
    })
    .on("mouseover", (event, d) => {
      d3.selectAll("circle").style("opacity", 1);
    })
    .on("mouseleave", (event, d) => {
      d3.selectAll("circle").style("opacity", 0);
    });

  //ve hinh tron
  svg
    .selectAll("circle")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 8)
    .attr("cx", (d) => {
      return xScale(d.date) + xScale.bandwidth() / 2;
    })
    .attr("cy", (d) => {
      return yScale(d.negative);
    })
    .attr("fill", colorLine)
    .attr("opacity", 0)
    .on("mousemove", (event, d) => {
      d3.selectAll("circle").style("opacity", 1);
    })
    .on("mouseover", (event, d) => {
      d3.selectAll("circle").style("opacity", 1);
    })
    .on("mouseleave", (event, d) => {
      d3.selectAll("circle").style("opacity", 0);
    });

  function transition(path) {
    path
      .transition()
      .duration(2500)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", () => {
        d3.select(this).call(transition);
      });
  }
  function tweenDash() {
    const l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) {
      return i(t);
    };
  }
};

const BarLineChart = (props: IBarLineChartProps) => {
  const { className } = props;

  const ref = useRef(null);

  useEffect(() => {
    chart();
    return () => {
      d3.selectAll(".barline-chart g").remove();
    };
  }, [data]);

  return (
    <div className={`barline-chart ${className ? className : ""} `}>
      <p className="barline-chart__title" style={{ marginRight: `${marginRight}px` }}>
        Tất cả tin bài
      </p>
      <svg ref={ref}>
        <defs>
          <linearGradient id={`gradient`} gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={colorLine} stopOpacity={"100%"} />
            <stop offset="100%" stopColor={colorLine} stopOpacity={"0%"} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BarLineChart;
