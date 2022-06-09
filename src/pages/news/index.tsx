import { NewsCardDataFake } from "model/news/NewsModel";
import React, { useEffect, useState } from "react";
import "./index.scss";
import NewsFeed from "./partials/NewsFeed";
import NewsFilter from "./partials/NewsFilter";

export default function News() {
  const [sizeLimit, setSizeLimit] = useState(8);
  const [cards, setCards] = useState(NewsCardDataFake);
  const [page, setPage] = useState(1);

  const [currentCards, setCurentCards] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  const [modal, setModal] = useState(false);
  const [dataCard, setDataCard] = useState({});

  const [cardIndex, setCardIndex] = useState(null);

  useEffect(() => {
    const endOffset = itemOffset + sizeLimit;
    setCurentCards(cards.slice(itemOffset, endOffset));
  }, [itemOffset, sizeLimit]);

  useEffect(() => {
    page > 1 ? setItemOffset((page - 1) * sizeLimit) : setItemOffset(0);
  }, [page]);

  const toggle = () => setModal(!modal);

  const handleCardClick = (card: any, i: number) => {
    toggle();
    setDataCard(card);
    setCardIndex(i);
  };

  const handlePrevNews = () => {
    const newIndex = cardIndex - 1;
    if (newIndex < 0) {
      return null;
    } else {
      setDataCard(cards[newIndex]);
      setCardIndex(newIndex);
    }
  };

  const handleNextNews = () => {
    const newIndex = cardIndex + 1;
    if (newIndex < cards.length) {
      setDataCard(cards[newIndex]);
      setCardIndex(newIndex);
    }
  };

  return (
    <div className="news">
      <div className="news__container">
        <NewsFilter />
        <NewsFeed
          sizeLimit={sizeLimit}
          cards={cards}
          page={page}
          setPage={setPage}
          currentCards={currentCards}
          handleCardClick={handleCardClick}
          handlePrevNews={handlePrevNews}
          handleNextNews={handleNextNews}
          dataCard={dataCard}
          modal={modal}
          toggle={toggle}
          cardType="vertical"
        />
      </div>
    </div>
  );
}
