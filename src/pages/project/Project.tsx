import Input from "components/input/input";
import NewsCard from "components/newsCard/NewsCard";
import TabContent from "components/tabContent/tabContent";
import React from "react";
import "./project.scss";
import avatar from "assets/images/avatar.jpg";
import Icon from "components/icon";
import Radio from "components/radio/radio";
import TotalCard from "components/totalCard/TotalCard";
import BreadcrumbItem from "components/breadcrumbs/BreadcrumbItem";
import BreadcrumbMenu from "components/breadcrumbs/BreadcrumbMenu";
import CardProject from "./partials/CardProject";
import { Pills } from "components/pills/Pills";
import { useState } from "react";
import Common from "utils/common";
import { Pagination } from "components/pagination/pagination";

const Project = () => {
  const [page, setPage] = useState(1);

  const [listNews, setListNews] = useState([
    {
      label: "tất cả",
      value: "1",
      active: true,
    },
    {
      label: "báo chí",
      value: "2",
      active: false,
    },
    {
      label: "facebook",
      value: "3",
      active: false,
    },
  ]);

  const [listNewsLabel, setListNewsLabel] = useState([
    {
      label: "tất cả",
      value: 1,
      active: true,
    },
    {
      label: "facebook",
      value: 2,
      active: false,
    },
    {
      label: "trang báo",
      value: 3,
      active: false,
    },
    {
      label: "youtube",
      value: 4,
      active: false,
    },
  ]);

  const [listNewsCount, setListNewsCount] = useState([
    {
      label: "tất cả",
      value: 1,
      active: true,
    },
    {
      label: "facebook",
      value: 2,
      active: false,
    },
    {
      label: "trang báo",
      value: 3,
      active: false,
    },
    {
      label: "youtube",
      value: 4,
      active: false,
    },
  ]);

  const [itemsFilter, setItemsFilter] = useState([
    {
      type: "key",
      label: "từ khoá 1",
      value: "từ khoá 1",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 2",
      value: "từ khoá 2",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 3",
      value: "từ khoá 3",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 4",
      value: "từ khoá 4",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 5",
      value: "từ khoá 5",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 6",
      value: "từ khoá 6",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 7",
      value: "từ khoá 7",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 8",
      value: "từ khoá 8",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 9",
      value: "từ khoá 9",
      active: true,
      selected: false,
    },
    {
      type: "key",
      label: "từ khoá 10",
      value: "từ khoá 10",
      active: true,
      selected: false,
    },
    {
      type: "shade",
      label: "tích cực",
      value: "tích cực",
      active: true,
      selected: false,
    },
    {
      type: "shade",
      label: "tiêu cực",
      value: "tiêu cực",
      active: true,
      selected: false,
    },
    {
      type: "shade",
      label: "trung lập",
      value: "trung lập",
      active: true,
      selected: false,
    },
  ]);

  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div className="main-page">
      <BreadcrumbMenu className="main-page__breadcrum">
        <BreadcrumbItem>Danh sách dự án</BreadcrumbItem>
        <BreadcrumbItem>Dự án A</BreadcrumbItem>
      </BreadcrumbMenu>
      <div className="main-page__content">
        <div className="main-page--left">
          <div className="main-page__overview">
            <div className="main-page__overview-header">
              <p>thông tin tổng quan</p>
              <span>
                <Icon name="Edit" />
                sửa
              </span>
            </div>
            <div className="main-page__overview-inner">
              <div className="main-page__overview-inner--left">
                <div className="main-page__overview-inner__content">
                  <p>Thông tin dự án</p>
                  <ul>
                    <li>Họ và tên dối tượng A, thông tin nhân khẩu đối tượng A</li>
                    <li>Họ và tên dối tượng A, thông tin nhân khẩu đối tượng A</li>
                  </ul>
                  <p>
                    Ngày dự án: <span>19/03/2018</span>
                  </p>
                  <p>Định danh đối tượng</p>
                  <ul>
                    <li>Tài khoản facebook</li>
                    <li>Kênh Youtube</li>
                    <li>Tài khoản Tiktok</li>
                  </ul>
                  <p>
                    Chủ đề phổ biến: <span>chủ đề a, chủ đề b, chủ đề c</span>
                  </p>
                  <p>
                    Từ khoá nổi bật: <span>từ khoá 1, từ khoá 2, từ khoá 3</span>
                  </p>
                  <p>Nguồn đăng phổ biến</p>
                  <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                  </ul>
                </div>
                <Pills color="success">Đang hoạt động</Pills>
              </div>
              <div className="main-page__overview-inner--right">
                <div className="main-page__overview-inner--right__card">
                  <div>
                    <p>Tổng số tin bài</p>
                    <h5>1,612</h5>
                  </div>
                  <Icon name="NewsTotal" />
                </div>
                <div className="main-page__overview-inner--right__card">
                  <div>
                    <p>Tin bài tiêu cực</p>
                    <h5>212</h5>
                  </div>
                  <Icon name="NewsNegative" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-page--right">
          <div className="main-page--right-relate">
            <p className="main-page--right-title">Dự án liên quan</p>
            <Input placeholder="Tìm kiếm thông tin" className="main-page--right-search" />
            <div className="main-page--right-relate__cards">
              <CardProject type="horizontal">
                <ul>
                  <li>Ngày nghiên cứu: dd/mm/yy</li>
                  <li>Chủ đề hoạt động phổ biến: 1 chủ đề biến nhất</li>
                  <li>Nguồn đăng phổ biến: 1 tên phổ biến nhất</li>
                  <li>Nguồn đăng phổ biến: 1 tên phổ biến nhất</li>
                </ul>
              </CardProject>
              <CardProject type="horizontal">
                <ul>
                  <li>Ngày nghiên cứu: dd/mm/yy</li>
                  <li>Chủ đề hoạt động phổ biến: 1 chủ đề biến nhất</li>
                  <li>Nguồn đăng phổ biến: 1 tên phổ biến nhất</li>
                  <li>Nguồn đăng phổ biến: 1 tên phổ biến nhất</li>
                </ul>
              </CardProject>
              <CardProject type="horizontal">
                <ul>
                  <li>Ngày nghiên cứu: dd/mm/yy</li>
                  <li>Chủ đề hoạt động phổ biến: 1 chủ đề biến nhất</li>
                  <li>Nguồn đăng phổ biến: 1 tên phổ biến nhất</li>
                  <li>Nguồn đăng phổ biến: 1 tên phổ biến nhất</li>
                </ul>
              </CardProject>
            </div>
          </div>
          <div className="main-page--right-newsfeed">
            <p className="main-page--right-title">Tin bài mới</p>
            <TabContent
              listTab={listNews}
              variant="fill"
              onChangeTab={(tab) =>
                setListNews(
                  listNews.map((el) => (el.value === tab.value ? { ...el, active: true } : { ...el, active: false }))
                )
              }
            >
              <div className="main-page--right-newsfeed__cards">
                <NewsCard
                  type="thumb-right"
                  card={{
                    thumb: avatar,
                    imageSrc: avatar,
                    title: "Tiêu đề tin bài",
                    id: 1,
                    summary:
                      "lorem sdjh sjkahd kjashdk kjahsd kjhasd k sjdh álkdj álkdjas álkdjas salkdjas ákjdas álkdj alskdk kjlas jhasd kjahsd",
                  }}
                />
                <NewsCard
                  type="thumb-right"
                  card={{
                    thumb: avatar,
                    imageSrc: avatar,
                    title: "Tiêu đề tin bài",
                    id: 1,
                    summary: "lorem sdjh sjkahd kjashdk kjahsd kjhasd kjhasd kjahsd",
                  }}
                />
                <NewsCard
                  type="thumb-right"
                  card={{
                    thumb: avatar,
                    imageSrc: avatar,
                    title: "Tiêu đề tin bài",
                    id: 1,
                    summary: "lorem sdjh sjkahd kjashdk kjahsd kjhasd kjhasd kjahsd",
                  }}
                />
                <NewsCard
                  type="thumb-right"
                  card={{
                    thumb: avatar,
                    imageSrc: avatar,
                    title: "Tiêu đề tin bài",
                    id: 1,
                    summary: "lorem sdjh sjkahd kjashdk kjahsd kjhasd kjhasd kjahsd",
                  }}
                />
              </div>
            </TabContent>
          </div>
        </div>
      </div>

      <div className="main-page__newsfeed">
        <p className="main-page__newsfeed-title">tin bài đươc gán nhãn</p>
        <TabContent
          className="main-page__newsfeed-tab"
          onChangeTab={(tab) =>
            setListNewsLabel(
              listNewsLabel.map((el) => (el.value === tab.value ? { ...el, active: true } : { ...el, active: false }))
            )
          }
          listTab={listNewsLabel}
          variant="fill"
        >
          <div className="main-page__newsfeed-tabcontent">
            <div className="main-page__newsfeed-search">
              <Input
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  const query = Common.removeAccents(e.target.value).toLowerCase().trim();
                  setItemsFilter(
                    itemsFilter.map((el) =>
                      Common.removeAccents(el.value).toLowerCase().trim().includes(query)
                        ? { ...el, active: true }
                        : { ...el, active: false }
                    )
                  );
                }}
                placeholder="Nhập từ tìm kiếm"
                icon={<Icon name="Search" />}
                iconPosition="left"
              />
              <div className="main-page__newsfeed-search__header">
                <p>Lọc theo:</p>
                <div className="main-page__newsfeed-search__header-menu">
                  <Radio
                    name="filter"
                    value="all"
                    defaultChecked={true}
                    label="Tất cả"
                    onChange={(e) => {
                      if (e.target.checked) setItemsFilter(itemsFilter.map((el) => ({ ...el, active: true })));
                    }}
                  />
                  <Radio
                    name="filter"
                    value="key"
                    label="Từ khoá"
                    onChange={(e) => {
                      if (e.target.checked)
                        setItemsFilter(
                          itemsFilter.map((el) =>
                            el.type === "key" ? { ...el, active: true } : { ...el, active: false }
                          )
                        );
                    }}
                  />
                  <Radio
                    name="filter"
                    value="shade"
                    label="Sắc thái"
                    onChange={(e) => {
                      if (e.target.checked)
                        setItemsFilter(
                          itemsFilter.map((el) =>
                            el.type === "shade" ? { ...el, active: true } : { ...el, active: false }
                          )
                        );
                    }}
                  />
                </div>
              </div>
              <ul>
                {itemsFilter
                  .filter((el) => el.active === true)
                  .map((el, idx) => (
                    <li
                      key={idx}
                      className={el.selected ? `main-page__newsfeed-search__header-item` : ""}
                      onClick={() =>
                        setItemsFilter(
                          itemsFilter.map((it) =>
                            it.value === el.value ? { ...it, selected: true } : { ...it, selected: false }
                          )
                        )
                      }
                    >
                      {el.label}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="main-page__newsfeed-content">
              <div className="main-page__newsfeed-content--inner">
                <NewsCard
                  type="horizontal"
                  card={{
                    id: 1,
                    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
                    source: "Facebook.com",
                    date: "1 tháng 1 năm 2022",
                    tag: "Tích cực",
                    imageSrc:
                      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title:
                      "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
                    stickers: ["sticker 1", "sticker 2"],
                    summary:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    view: 255,
                    like: 255,
                    comment: 255,
                    share: 99,
                  }}
                />
                <NewsCard
                  type="horizontal"
                  card={{
                    id: 1,
                    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
                    source: "Facebook.com",
                    date: "1 tháng 1 năm 2022",
                    tag: "Tích cực",
                    imageSrc:
                      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title:
                      "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
                    stickers: ["sticker 1", "sticker 2"],
                    summary:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    view: 255,
                    like: 255,
                    comment: 255,
                    share: 99,
                  }}
                />
                <NewsCard
                  type="horizontal"
                  card={{
                    id: 1,
                    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
                    source: "Facebook.com",
                    date: "1 tháng 1 năm 2022",
                    tag: "Tích cực",
                    imageSrc:
                      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title:
                      "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
                    stickers: ["sticker 1", "sticker 2"],
                    summary:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    view: 255,
                    like: 255,
                    comment: 255,
                    share: 99,
                  }}
                />
                <NewsCard
                  type="horizontal"
                  card={{
                    id: 1,
                    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
                    source: "Facebook.com",
                    date: "1 tháng 1 năm 2022",
                    tag: "Tích cực",
                    imageSrc:
                      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title:
                      "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
                    stickers: ["sticker 1", "sticker 2"],
                    summary:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    view: 255,
                    like: 255,
                    comment: 255,
                    share: 99,
                  }}
                />
                <NewsCard
                  type="horizontal"
                  card={{
                    id: 1,
                    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
                    source: "Facebook.com",
                    date: "1 tháng 1 năm 2022",
                    tag: "Tích cực",
                    imageSrc:
                      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title:
                      "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
                    stickers: ["sticker 1", "sticker 2"],
                    summary:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    view: 255,
                    like: 255,
                    comment: 255,
                    share: 99,
                  }}
                />
                <NewsCard
                  type="horizontal"
                  card={{
                    id: 1,
                    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
                    source: "Facebook.com",
                    date: "1 tháng 1 năm 2022",
                    tag: "Tích cực",
                    imageSrc:
                      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title:
                      "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
                    stickers: ["sticker 1", "sticker 2"],
                    summary:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    view: 255,
                    like: 255,
                    comment: 255,
                    share: 99,
                  }}
                />
              </div>

              <Pagination
                name=""
                displayNumber={3}
                page={page}
                sizeLimit={20}
                totalPage={5}
                totalItem={100}
                setPage={(page) => setPage(page)}
              />
            </div>
          </div>
        </TabContent>
      </div>

      <div className="main-page__statistical">
        <p className="main-page__statistical-title">số lượng tin bài được gán nhãn theo sắc thái</p>
        <TabContent
          className="main-page__statistical-tab"
          onChangeTab={(tab) =>
            setListNewsCount(
              listNewsCount.map((el) => (el.value === tab.value ? { ...el, active: true } : { ...el, active: false }))
            )
          }
          listTab={listNewsCount}
          variant="fill"
        >
          <div className="main-page__statistical-content">
            <TotalCard type="social" />
            <TotalCard type="news" />
            <TotalCard type="other" />
          </div>
        </TabContent>
      </div>

      <div className="main-page__footer">
        <p className="main-page__footer-header">
          KẾT LUẬN DIỄN BIẾN TỔNG QUAN NGÀY
          <span>
            <Icon name="Edit" />
            Sửa
          </span>
        </p>
        <div className="main-page__footer-body">
          Trong khoảng thời gian Tuần này từ 21/03/2022 đến 28/03/2022, Alert đã ghi nhận số lượt đề cập tới Đối tượng A
          trên internet như sau: 1.237 bài đăng trên mạng xã hội. Giảm 34% so với ngày trước đó. 2.904 tin bài, bài viết
          trên các trang báo điện tử, trang tin điện tử. Tăng 1% so với tuần trước đó. Hệ thống đồng thời ghi nhận thời
          điểm cao điểm nhất trên mạng xã hội là 18:00 với 134 lượt đề cập. Tin bài được thu thập đang dần có xu hướng
          tiêu cực, trong đó tin có sắc thái tiêu cực chiếm đến 11.37% tổng số tin bài. Tỉ lệ sắc thái tin đang thiên về
          hướng tiêu cực hơn so với tích cực, cụ thể gấp 1.19 lần tin tích cực.
        </div>
      </div>
    </div>
  );
};

export default Project;
