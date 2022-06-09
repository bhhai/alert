import Checkbox from "components/checkbox/checkbox";
import Icon from "components/icon";
import NewsCard from "components/newsCard/NewsCard";
import { Pagination } from "components/pagination/pagination";
import TabContent from "components/tabContent/tabContent";
import { CardModel } from "model/news/NewsModel";
import React, { useState } from "react";
import NewsDetailPopup from "./NewsDetailPopup";
import "./NewsFeed.scss";

interface NewsFeedProps {
  sizeLimit: number;
  cards: CardModel[];
  page: number;
  setPage: (page: number) => void;
  currentCards: CardModel[];
  handleCardClick: (card: CardModel, i: number) => void;
  handlePrevNews: () => void;
  handleNextNews: () => void;
  dataCard: any;
  modal: boolean;
  toggle: () => void;
  cardType: "vertical" | "horizontal";
}

export default function NewsFeed(props: NewsFeedProps) {
  const {
    sizeLimit,
    cards,
    page,
    setPage,
    currentCards,
    handleCardClick,
    handlePrevNews,
    handleNextNews,
    dataCard,
    modal,
    toggle,
    cardType,
  } = props;

  const [tabs, setTabs] = useState([
    {
      value: "all",
      active: true,
      label: "Tất cả",
    },
    {
      value: "video",
      active: false,
      label: "Video",
    },
    {
      value: "text",
      active: false,
      label: "Text",
    },
  ]);

  return (
    <div className="news-feed">
      <div className="news-feed__container">
        <div className="news-feed__result">
          <span className="news-feed__result__label">Kết quả:</span>
          <span>14,134 tin bài</span>
        </div>

        <div className="news-feed__tab">
          <div className="news-feed__tab__left">
            <TabContent
              variant="fill"
              listTab={tabs}
              onChangeTab={(element) =>
                setTabs([
                  ...tabs.map((el) =>
                    el.value === element.value ? { ...el, active: true } : { ...el, active: false }
                  ),
                ])
              }
            />

            <Checkbox className="news-feed__checkbox" icon={<Icon name="Checked" />} label="Gộp tin tương tự" />
          </div>

          <div className="news-feed__tab__button">
            <button className="btn-refresh">
              <Icon name="Refresh" /> Làm mới
            </button>
            <button className="btn-sort">
              <Icon name="SortbySmall" />
            </button>
          </div>
        </div>

        <div className="news-feed__cart-list row">
          {currentCards &&
            currentCards.length > 0 &&
            currentCards.map((card, i) => (
              <div key={card.id} className="col-3 news-feed__col">
                {<NewsCard onClick={() => handleCardClick(card, i)} card={card} type={cardType} />}
              </div>
            ))}

          <NewsDetailPopup
            prevNews={handlePrevNews}
            nextNews={handleNextNews}
            data={dataCard}
            modal={modal}
            toggle={toggle}
          />
        </div>

        <Pagination
          name={""}
          displayNumber={sizeLimit}
          page={page}
          setPage={(page) => setPage(page)}
          sizeLimit={sizeLimit}
          totalItem={cards.length}
          totalPage={Math.ceil(cards.length / sizeLimit)}
        />
      </div>
    </div>
  );
}
