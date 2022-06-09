import ImportFile from "components/importFileButton/ImportFile";
import NewsCard from "components/newsCard/NewsCard";
import { Pagination } from "components/pagination/pagination";
import TabContent from "components/tabContent/tabContent";
import { CardModel } from "model/news/NewsModel";
import React from "react";

interface NewsFeature {
  tabs: any;
  setTabs: any;
  currentCards: CardModel[];
  handleCardClick: (card: CardModel, num: number) => void;
  sizeLimit: number;
  page: number;
  setPage: (num: number) => void;
  cards: any;
}

export default function NewsFeature(props: NewsFeature) {
  const { tabs, setTabs, currentCards, handleCardClick, sizeLimit, page, setPage, cards } = props;
  return (
    <div className="dashboard__block">
      <div className="dashboard__head dashboard__feature-source">
        <h3 className="dashboard__title">Tin bài nổi bật</h3>
      </div>
      <div className="dashboard__tabs">
        <TabContent
          variant="fill"
          listTab={tabs}
          onChangeTab={(element) =>
            setTabs([
              ...tabs.map((el) => (el.value === element.value ? { ...el, active: true } : { ...el, active: false })),
            ])
          }
        />
      </div>
      <div className="dashboard__news-feed">
        <div className="row">
          {currentCards.map((card, i) => (
            <div className="col-6 news-item" key={card.id}>
              <NewsCard type="horizontal" card={card} onClick={() => handleCardClick(card, i)} />
            </div>
          ))}
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
