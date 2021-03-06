import BarChart from "chart/BarChart/BarChart";
import BarLineChart from "chart/BarLineChart/BarLineChart";
import HorizontalStackedBarChart from "chart/HorizontalStackedBarChart/HorizontalStackedBarChart";
import LineChart from "chart/LineChart/LineChart";
import MultiBarChart from "chart/MultiBarChart/MultiBarChart";
import Button from "components/button/button";
import { HeaderBottom } from "components/header/Header";
import ImportFile from "components/importFileButton/ImportFile";
import NewsCard from "components/newsCard/NewsCard";
import SelectCustom from "components/selectCustom/selectCustom";
import TabContent from "components/tabContent/tabContent";
import TotalCard from "components/totalCard/TotalCard";
import { SourceFilterData } from "model/dashboard/DashboardModel";
import { NewsCardDataFake } from "model/news/NewsModel";
import NewsDetailPopup from "pages/news/partials/NewsDetailPopup";
import React, { useEffect, useState } from "react";
import "./index.scss";
import ContentStatus from "./partials/ContentStatus";
import NewsFeature from "./partials/NewsFeature";
import ObjectBoxTable from "./partials/ObjectBoxTable";

export default function Dashboard() {
  const [modal, setModal] = useState<boolean>(false);
  const [dataCard, setDataCard] = useState({});
  const [tabs, setTabs] = useState(SourceFilterData);

  const [sizeLimit, setSizeLimit] = useState(6);
  const [cards, setCards] = useState(NewsCardDataFake);
  const [page, setPage] = useState(1);

  const [currentCards, setCurentCards] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [cardIndex, setCardIndex] = useState<number>(null);
  const toggle = () => setModal(!modal);
  const handleCardClick = (card: any, i: number) => {
    toggle();
    setDataCard(card);
    setCardIndex(i);
  };

  useEffect(() => {
    const endOffset = itemOffset + sizeLimit;
    setCurentCards(cards.slice(itemOffset, endOffset));
  }, [itemOffset, sizeLimit]);

  useEffect(() => {
    page > 1 ? setItemOffset((page - 1) * sizeLimit) : setItemOffset(0);
  }, [page]);

  return (
    <div className="dashboard">
      <HeaderBottom />
      <div className="dashboard__container">
        <div className="row">
          <div className="col-8">
            <div className="dashboard__block">
              <div className="dashboard__head">
                <h3 className="dashboard__title">T???ng s??? tin b??i</h3>
              </div>
              <div className="row">
                <div className="col-4">
                  <TotalCard type="news" size="small" />
                </div>
                <div className="col-4">
                  <TotalCard type="social" size="small" />
                </div>
                <div className="col-4">
                  <TotalCard type="other" size="small" />
                </div>
              </div>
            </div>
            <div className="dashboard__block">
              <div className="dashboard__head dashboard__feature-source">
                <h3 className="dashboard__title">Ngu???n ????ng n???i b???t</h3>
                <ImportFile />
              </div>
              <div className="dashboard__tabs">
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
              </div>
              <div className="dashboard__barline">
                <BarLineChart />
              </div>
            </div>
          </div>
          <div className="col-4 right-col">
            <div>
              <div className="dashboard__head">
                <h3 className="dashboard__title">Tin b??i m???i</h3>
                <Button color="transparent">Xem th??m</Button>
              </div>
              <div className="dashboard__card">
                {NewsCardDataFake.slice(0, 3).map((card, i) => (
                  <NewsCard key={card.id} type="thumb-right" card={card} onClick={() => handleCardClick(card, i)} />
                ))}
              </div>
            </div>
            <div className="map-col">
              <div className="dashboard__head heatmap__head">
                <h3 className="dashboard__title">T??? kh??a n???i b???t</h3>
                <Button color="transparent">Xem th??m</Button>
              </div>
              <div className="dashboard__heatmap"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <NewsFeature
              cards={cards}
              currentCards={currentCards}
              handleCardClick={handleCardClick}
              page={page}
              setPage={setPage}
              setTabs={setTabs}
              sizeLimit={sizeLimit}
              tabs={tabs}
            />
          </div>
          <div className="col-4 map-col">
            <div className="dashboard__head heatmap__head">
              <h3 className="dashboard__title">V???n ????? ti??u c???c n???i b???t</h3>
              <Button color="transparent">Xem th??m</Button>
            </div>
            <div className="dashboard__heatmap">
              <MultiBarChart />
            </div>
          </div>
        </div>
        <div className="dashboard__news">
          <div className="dashboard__block w-100">
            <div className="dashboard__head dashboard__feature-source">
              <h3 className="dashboard__title">D??? ??n n???i b???t</h3>
              <ImportFile />
            </div>
            <div className="dashboard__barl ine">
              <HorizontalStackedBarChart />
            </div>
          </div>
        </div>
        <div>
          <ObjectBoxTable />
        </div>
        <div className="dashboard__news">
          <div className="dashboard__block w-100">
            <div className="dashboard__head dashboard__feature-source">
              <h3 className="dashboard__title">Di???n bi???n tin t???c</h3>
              <ImportFile />
            </div>
            <div className="dashboard__tabs">
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
            </div>
            <div className="dashboard__barline">
              <BarChart className="" />
            </div>
          </div>
        </div>

        {/* S???c th??i n???i dung */}
        <ContentStatus />

        {/* Line chart */}
        <div className="dashboard__linechart">
          <div className="dashboard__linechart__header">
            <div className="dashboard__linechart__title">
              <h4>Di???n bi???n tin b??i theo s???c th??i</h4>
              <div className="header-bottom__left">
                <SelectCustom
                  placeholder="Ch???n ngu???n"
                  options={[
                    { value: "1", label: "Tr??n b??o ch??" },
                    { value: "2", label: "Tr??n m???ng x?? h???i" },
                    { value: "3", label: "Ngu???n kh??c" },
                    { value: "4", label: "T???t c??? c??c ngu???n" },
                  ]}
                />
              </div>
            </div>
            <ImportFile />
          </div>
          {/* <LineChart /> */}
        </div>
      </div>
      <NewsDetailPopup data={dataCard} modal={modal} toggle={toggle} />
    </div>
  );
}
