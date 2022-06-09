import React, { useRef, useEffect, useState } from "react";
import "./LineChart.scss";
import * as d3 from "d3";
import Common from "utils/common";

interface ILineChartProps {
  className?: string;
}

const tmp = [
  {
    date: new Date("2020-01-01"),
    name: "Tiêu cực",
    value: 200,
  },
  {
    date: new Date("2020-01-01"),
    name: "Tích cực",
    value: 30,
  },
  {
    date: new Date("2020-01-01"),
    name: "Trung lập",
    value: 10,
  },

  {
    date: new Date("2020-01-02"),
    name: "Tiêu cực",
    value: 42,
  },
  {
    date: new Date("2020-01-02"),
    name: "Tích cực",
    value: 19,
  },
  {
    date: new Date("2020-01-02"),
    name: "Trung lập",
    value: 54,
  },
  {
    date: new Date("2020-01-03"),
    name: "Tiêu cực",
    value: 76,
  },
  {
    date: new Date("2020-01-03"),
    name: "Tích cực",
    value: 80,
  },
  {
    date: new Date("2020-01-03"),
    name: "Trung lập",
    value: 20,
  },
  {
    date: new Date("2020-01-04"),
    name: "Tích cực",
    value: 76,
  },
  {
    date: new Date("2020-01-04"),
    name: "Tiêu cực",
    value: 145,
  },
  {
    date: new Date("2020-01-04"),
    name: "Trung lập",
    value: 90,
  },
];

const titles = ["tiêu cực", "tích cực", "trung lập"];
const colors = ["#eb5757", "#27ae60", "#1850a8cc"];

const formatClassName = (str) => Common.removeAccents(str.toLowerCase().replace(" ", ""));

const marginTop = 20,
  marginBottom = 40,
  marginLeft = 100,
  marginRight = 20;

const LineChart = (props: ILineChartProps) => {
  const { className } = props;

  const ref = useRef(null);
  const refContainer = useRef(null);

  useEffect(() => {
    const width = refContainer.current.offsetWidth - marginLeft - marginRight;
    const height = refContainer.current.offsetHeight - marginTop - marginBottom;

    const svg = d3
      .select("svg")
      .attr("width", width + marginLeft + marginRight)
      .attr("height", height + marginTop + marginBottom)
      .append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    const tooltip = d3.select(".line-chart__tooltip");

    //theo ngày, chục x
    const X = d3.map(tmp, (d) => d.date);
    const xDomain = d3.extent(X).map((d) => new Date(d));

    //value
    const Y = d3.map(tmp, (d) => d.value);
    const yDomain = [0, d3.max(Y)];

    const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);
    const xScale = d3.scaleUtc().domain(xDomain).range([0, width]);

    //vẽ chục y
    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickSize(0))
      .attr("stroke-opacity", 0.1)
      .call((g) =>
        g.selectAll(".tick text").attr("x", -24).attr("font-weight", 700).attr("font-size", 16).attr("color", "#828282")
      )
      .call((g) => g.selectAll(".tick line").clone().attr("x1", width).attr("stroke-opacity", 0.1));

    //vẽ chục x
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("stroke-opacity", 0.1)
      .call(d3.axisBottom(xScale).tickSize(0))
      .call((g) =>
        g.selectAll(".tick text").attr("y", 24).attr("font-weight", 700).attr("font-size", 16).attr("color", "#828282")
      )
      .call((g) => g.selectAll(".tick line").clone().attr("y1", -height).attr("stroke-opacity", 0.1));

    //console.log(d3.group(tmp, (d) => d.name))

    //vẽ miền
    svg
      .append("g")
      .selectAll("path")
      .data(d3.group(tmp, (d) => d.name))
      .enter()
      .append("path")
      .attr("class", (d) => `rect-${formatClassName(d[0])}`)
      .attr("d", (d) =>
        d3
          .area()
          .x((d) => xScale(d.date))
          .y0(height)
          .y1((d) => yScale(d.value))(d[1])
      )
      .attr("fill", (d, i) => `url('#gradient-${formatClassName(d[0])}')`)
      .attr("stroke", "none")
      .style("opacity", 0);

    //vẽ line
    svg

      .selectAll(".line")
      .append("g")
      .data(d3.group(tmp, (d) => d.name))
      .enter()
      .append("path")
      .attr("d", (d) =>
        d3
          .line()
          .x((t) => xScale(t.date))
          .y((d) => yScale(d.value))(d[1])
      )
      .attr("fill", "none")
      .attr("stroke", (d, i) => colors[i])
      .call(transition)
      .on("mousemove", (event, d) => {
        //khi di chuyển vào line thì hiện rect và circle
        d3.selectAll(`.rect-${formatClassName(d[0])}`).style("opacity", 1);
        d3.selectAll(`.circle-${formatClassName(d[0])}`).style("opacity", 1);
      })
      .on("mouseover", (event, d) => {
        d3.selectAll(`.rect-${formatClassName(d[0])}`).style("opacity", 1);
        d3.selectAll(`.circle-${formatClassName(d[0])}`).style("opacity", 1);
      })
      .on("mouseleave", (event, d) => {
        d3.selectAll(`.rect-${formatClassName(d[0])}`).style("opacity", 0);
        d3.selectAll(`.circle-${formatClassName(d[0])}`).style("opacity", 0);
      });

    //vẽ hình tròn
    svg
      .selectAll("circle")
      .append("g")
      .data(tmp)
      .enter()
      .append("circle")
      .attr("r", 6)
      .attr("cx", (d) => {
        return xScale(d.date);
      })
      .attr("cy", (d) => yScale(d.value))
      .attr("fill", (d) => {
        return colors[titles.map((el) => formatClassName(el)).indexOf(formatClassName(d.name))];
      })
      .attr("class", (d) => `circle-${formatClassName(d.name)}`)
      .style("opacity", 0)
      .on("mouseover", (event, d) => {
        d3.selectAll(`.rect-${formatClassName(d.name)}`).style("opacity", 1);
        d3.selectAll(`.circle-${formatClassName(d.name)}`).style("opacity", 1);
        tooltip.html(`${d.value}`).style("visibility", 'visible');
      })
      .on("mousemove", (event, d) => {
        //khi di chuyển vào line thì hiện rect và circle
        d3.selectAll(`.rect-${formatClassName(d.name)}`).style("opacity", 1);
        d3.selectAll(`.circle-${formatClassName(d.name)}`).style("opacity", 1);
        tooltip
          .style("left", `${event.x - 20}px`)
          .style("top", `${event.y - 40}px`)
          .style("background-color", colors[titles.map((el) => formatClassName(el)).indexOf(formatClassName(d.name))]);
      })

      .on("mouseleave", (event, d) => {
        d3.selectAll(`.rect-${formatClassName(d.name)}`).style("opacity", 0);
        d3.selectAll(`.circle-${formatClassName(d.name)}`).style("opacity", 0);
        tooltip.style("visibility", 'hidden');
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

    return () => {
      d3.selectAll(".line-chart g").remove();
    };
  }, [tmp]);

  return (
    <div ref={refContainer} className={`line-chart ${className ? className : ""} `}>
      <div className="line-chart__tooltip"></div>
      <p className="line-chart__title">Tất cả tin bài</p>
      <svg ref={ref}>
        {titles.map((el, index) => (
          <defs key={index}>
            <linearGradient id={`gradient-${formatClassName(el)}`} gradientTransform="rotate(90)">
              <stop offset="5%" stopColor={colors[index]} stopOpacity={"20%"} />
              <stop offset="95%" stopColor={colors[index]} stopOpacity={"2%"} />
            </linearGradient>
          </defs>
        ))}
      </svg>
      <ul className="line-chart__menu">
        {titles.map((el, i) => (
          <li key={i} className={`line-chart__item line-chart__item-${i}`}>
            <p className="line-chart__icon">
              <span></span>
            </p>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LineChart;
