import ImportFile from "components/importFileButton/ImportFile";
import React from "react";
import Common from "utils/common";

export default function ContentStatus() {
  return (
    <div className="content-status">
      <div className="dashboard__head dashboard__feature-source">
        <h3 className="dashboard__title">Sắc thái nội dung</h3>
        <ImportFile />
      </div>
      <div className="row">
        <div className="col-5">
          <div className="content-status__chart"></div>
        </div>
        <div className="col-7">
          <div className="content-status__report">
            <div className="row first-row">
              <StatisticsCard type="all" number={123} />
              <StatisticsCard type="negative" number={123123} />
            </div>
            <div className="row">
              <StatisticsCard type="positive" number={123123} />
              <StatisticsCard type="neutral" number={123123} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatisticsCardProps {
  number: number;
  type: "all" | "positive" | "negative" | "neutral";
}

const StatisticsCard = (props: StatisticsCardProps) => {
  const { number, type } = props;
  return (
    <div className="content-status__card">
      <h4 className={`number ${type ? ` title--${type}` : null}`}>{Common.formatCurrency(number)}</h4>
      <span className={`title ${type ? ` title--${type}` : null}`}>
        {type === "all"
          ? "Tổng số tin bài"
          : type === "positive"
          ? "Tin bài tích cực"
          : type === "negative"
          ? "Tin bài tiêu cực"
          : "Trung lập"}
      </span>
    </div>
  );
};
