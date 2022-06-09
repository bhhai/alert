import Icon from "components/icon";
import React, { useState } from "react";
import "./TotalCard.scss";
import NewsThumb from "assets/images/news-img.png";
import SocialThumb from "assets/images/social-img.png";
import OtherThumb from "assets/images/other-img.png";
import NewsThumbSmall from "assets/images/news-img-small.png";
import SocialThumbSmall from "assets/images/social-img-small.png";
import OtherThumbSmall from "assets/images/other-img-small.png";
import Common from "utils/common";

interface TotalCard {
  total: number;
  percent: number;
}

interface TotalCardProps {
  type: "social" | "news" | "other";
  size?: "small" | "medium";
}

export default function TotalCard(props: TotalCardProps) {
  const { type, size } = props;

  const [data, setData] = useState<TotalCard>({
    total: 2538,
    percent: -24,
  });

  return (
    <div className={`total-card ${size === "small" ? " total-card--size-small" : ""} `}>
      <div className="total-card__container">
        <div className="total-card__content">
          <h4 className="total-card__content__title">
            {type === "news" ? "Trên báo chí" : type === "social" ? "Trên mạng xã hội" : "Nguồn khác"}
          </h4>
          <h2 className={`total-card__content__total ${data.percent > 0 ? " plus" : " minus"}`}>
            {Common.formatCurrency(data.total)}
          </h2>
          {size === "small" ? null : (
            <div className="total-card__content__label">
              {data.percent > 0 ? (
                <span className="icon icon-up">
                  <Icon name="CaretUpGreen" />
                </span>
              ) : (
                <span className="icon icon-down">
                  <Icon name="CaretDownRed" />
                </span>
              )}
              <span className="label-bottom">
                <span className="percent">{data.percent > 0 ? "+" + data.percent : +data.percent}% </span>
                so với hôm qua
              </span>
            </div>
          )}
        </div>

        {size === "small" ? (
          <div className={`total-card__thumb ${type ? ` ${type}-thumb` : ""}`}>
            <img
              src={type === "news" ? NewsThumbSmall : type === "social" ? SocialThumbSmall : OtherThumbSmall}
              alt=""
            />
          </div>
        ) : (
          <div className={`total-card__thumb ${type ? ` ${type}-thumb` : ""}`}>
            <img src={type === "news" ? NewsThumb : type === "social" ? SocialThumb : OtherThumb} alt="" />
          </div>
        )}
      </div>
      <div className="total-card__content__label">
        {data.percent > 0 ? (
          <span className="icon icon-up">
            <Icon name="CaretUpGreen" />
          </span>
        ) : (
          <span className="icon icon-down">
            <Icon name="CaretDownRed" />
          </span>
        )}
        <span className="label-bottom">
          <span className="percent">{data.percent > 0 ? "+" + data.percent : +data.percent}% </span>
          so với hôm qua
        </span>
      </div>
    </div>
  );
}
