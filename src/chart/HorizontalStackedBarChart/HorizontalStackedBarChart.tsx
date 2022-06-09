import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./HorizontalStackedBarChart.scss";

const data = [
  {
    name: "dự án 1",
    "tin tức trên mạng xã hội": {
      quantity: 100,
      facebook: 10,
      twitter: 40,
      youtube: 50,
    },
    "tin tức trên báo trí": {
      quantity: 50,
    },
    "tin tức từ nguồn khác": {
      quantity: 70,
    },
  },
  {
    name: "dự án 2",
    "tin tức trên mạng xã hội": {
      quantity: 30,
    },
    "tin tức trên báo trí": {
      quantity: 210,
    },
    "tin tức từ nguồn khác": {
      quantity: 130,
    },
  },
  {
    name: "dự án 3",
    "tin tức trên mạng xã hội": {
      quantity: 120,
    },
    "tin tức trên báo trí": {
      quantity: 53,
    },
    "tin tức từ nguồn khác": {
      quantity: 129,
    },
  },
  {
    name: "dự án 4",
    "tin tức trên mạng xã hội": {
      quantity: 100,
    },
    "tin tức trên báo trí": {
      quantity: 56,
    },
    "tin tức từ nguồn khác": {
      quantity: 27,
    },
  },
];

const colors = ["#eb5757", "#27ae60", "#1850a8", "#e0e0e0"];

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 100,
  marginRight = 0;

const formatData = (data) => {
  const t = data.map((el) => {
    const keys = Object.keys(el).splice(1);
    let ob: any = keys.map((key) => {
      return { [key]: el[key].quantity };
    });

    ob = ob.reduce(function (result, item) {
      var key = Object.keys(item)[0]; //first property: a, b, c
      result[key] = item[key];
      return result;
    }, {});

    return { ...el, ...ob };
  });
  return t;
};

const HorizontalStackedBarChart = () => {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    const t = Object.keys(data[0]).splice(1);
    setTitles(t);
  }, []);
  useEffect(() => {
    const width = 900;
    const height = 400;

    const dataFormat = formatData(data);

    const xDomain = [
      0,
      d3.max(
        dataFormat
          .map((el) => Object.values(el))
          .map((el) => el.splice(1))
          .map((el) => el.reduce((prev: number, curr: number) => prev + curr, 0))
      ),
    ];

    const yDomain = d3.map(dataFormat, (d) => d.name);

    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop];

    const xScale = d3.scaleLinear().domain(xDomain).range(xRange);
    const yScale = d3.scaleBand().domain(yDomain).range(yRange).paddingInner(0.5).paddingOuter(0.5);

    const svg = d3
      .select(".horizontal-stacked-bar-chart svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .classed("svg-content", true)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const tooltip = d3.select(".horizontal-stacked-area-chart__tooltip");
    //vẽ chục x
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .ticks(height / 40)
      )
      .call((g) => g.selectAll(".tick text").attr("y", 22))
      .call((g) => g.selectAll(".tick line").clone().attr("y1", -height).attr("opacity", 1));
    //vẽ chục y
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale).tickSize(0))
      .call((g) => g.selectAll(".tick text").attr("x", -13));

    const keys = Object.keys(dataFormat[0]).splice(1);
    const stackedData = d3.stack().keys(keys)(dataFormat);

    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d, i) => colors[i])
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d.data.name))
      .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
      .attr("height", yScale.bandwidth())
      //   .transition()
      //   .ease(d3.easeLinear)
      //   .duration(700)
      //   .delay((d, i) => i * 50)
      //   .attr("width", (d) => {
      //     return xScale(d[1]) - xScale(d[0]);
      //   })
      .on("mousemove", function (event, d) {
        const subgroupName = d3.select(this.parentNode).datum().key;
        const groupName = d.data.name;
        const t = data.find((el) => el.name === groupName);
        //const str = `${for (const property in object) {}}`
        tooltip
          .html(
            `<div>
        <p>Tổng số ${subgroupName}: ${t[subgroupName].quantity}</p>
        <p>Trong đó</p>
        <ul>
            
        </ul>
        </div>`
          )
          .style("visibility", "visible");
      })
      .on("mouseover", function (event, d) {
        tooltip.style("left", event.x).style("top", event.y - 100);
      })
      .on("mouseleave", function (event, d) {
        tooltip.style("visibility", "hidden");
      });
  }, [data]);
  return (
    <div className="horizontal-stacked-bar-chart">
      <div className="horizontal-stacked-area-chart__tooltip"></div>
      <p className="horizontal-stacked-bar-chart__title">Tất cả tin bài</p>
      <svg></svg>
      <ul>
        {titles.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default HorizontalStackedBarChart;
