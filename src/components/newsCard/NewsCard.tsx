import Icon from "components/icon";
import { Pills } from "components/pills/Pills";
import React, { useEffect, useRef, useState } from "react";
import "./NewsCard.scss";

interface NewsCardProps {
  type: "vertical" | "horizontal" | "thumb-right";
  card: any;
  onClick?: () => void;
}

export default function NewsCard(props: NewsCardProps) {
  const { type, card, onClick } = props;
  const [titleLine, setTitleLine] = useState<number>(1);

  const refTitle = useRef(null);

  useEffect(() => {
    const titleHeight = refTitle.current.offsetHeight;

    if (titleHeight >= 60) {
      setTitleLine(2);
      if (titleHeight >= 90) {
        setTitleLine(3);
      }
    } else {
      setTitleLine(1);
    }
  }, []);

  return (
    <div className={`news-feed__card ${type ? ` news-feed__card--${type}` : ""}`} onClick={onClick}>
      {type !== "vertical" ? null : (
        <div className="news-feed__card__source">
          <div className="news-feed__card__thumb">
            <div>
              <img src={card.thumb} alt="" />
            </div>
            <div className="news-feed__card__name">
              <span>{card?.source}</span>
              <span className="news-feed__time">{card?.date}</span>
            </div>
          </div>

          <div className="news-feed__card__tag">
            <Pills color={`${card.tag === "Trung lập" ? "normal" : card.tag === "Tiêu cực" ? "error" : "success"}`}>
              {card?.tag}
            </Pills>
          </div>
        </div>
      )}

      <div className={`news-feed__card--${type}__body`}>
        <div className="news-feed__card__img">
          <img src={card?.imageSrc} alt="" />
        </div>
        <div className="news-feed__card__content">
          <h3 className={`news-feed__card__title ${titleLine === 3 ? " text-hidden" : null}`} ref={refTitle}>
            {card?.title + " " + card.id} <span className="title-icon">{<Icon name="Link" />}</span>
          </h3>

          {type !== "vertical" ? (
            <div className={`news-feed__card--${type}__source`}>
              <div className="source">
                <div className="source-logo">
                  <img src={card.thumb} alt="" />
                </div>
                <span>{card.source}</span>
              </div>

              <span className="time">1/1/2022</span>
            </div>
          ) : null}

          {type !== "vertical" ? null : (
            <div className="news-feed__card__stickers">
              {card?.stickers && card.stickers.map((sticker) => "#" + sticker).join(", ")}
            </div>
          )}

          <div
            className={`news-feed__card__summary ${
              titleLine === 3 ? " summary-hidden-3" : titleLine === 2 ? " summary-hidden-4" : " summary-hidden-5"
            }`}
          >
            {type !== "vertical" ? null : <span className="title-bold">Tóm tắt:</span>}
            <span>{card.summary}</span>
          </div>
        </div>
      </div>
      {type === "thumb-right" ? null : (
        <div className="news-feed__card__actions">
          <div className="news-feed__card__actions__view">
            <span className="news-feed__icon icon-old">{<Icon name="Eye" />}</span>
            <span className="news-feed__number">{card.view}</span>
          </div>
          <div className="news-feed__card__actions__view">
            <span className="news-feed__icon">{<Icon name="Like" />}</span>
            <span className="news-feed__number">{card.like}</span>
          </div>
          <div className="news-feed__card__actions__view">
            <span className="news-feed__icon">{<Icon name="Comment" />}</span>
            <span className="news-feed__number">{card.comment}</span>
          </div>
          <div className="news-feed__card__actions__view">
            <span className="news-feed__icon">{<Icon name="Share" />}</span>
            <span className="news-feed__number">{card.share}</span>
          </div>
        </div>
      )}
    </div>
  );
}
