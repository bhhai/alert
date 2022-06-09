import Icon from "components/icon";
import Input from "components/input/input";
import Tags from "components/tags/Tags";
import SearchItem from "pages/project/partials/SearchItem";
import React, { useEffect, useState } from "react";
import "./searchTable.scss";
import { IOption } from "model/OtherModel";

export interface ISearchTable {
  title: string;
  type: "select" | "checkbox";
  options: IOption[];
}

export interface ISearchTableProps {
  list?: ISearchTable[];
  onChangeTable?: (data) => void;
  onSearch?: (value) => void;
}

const SearchTable = (props: ISearchTableProps) => {
  const { list, onChangeTable, onSearch } = props;
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    onChangeTable({ tags, search });
  }, [tags, search]);

  return (
    <div className="base-search-table">
      <div className="search-table">
        {list?.map((el, i) => (
          <SearchItem
            key={i}
            label={el.title}
            type={el.type}
            options={el.options}
            data={tags}
            search={(value) => onSearch(value)}
            callback={(label, value) => {
              const tmp = value.map((el) => {
                return { value: el, label };
              });
              setTags([...tags.filter((el) => el.label !== label), ...tmp]);
            }}
          />
        ))}
        <form
          className="search-item-form"
          onSubmit={(e) => {
            e.preventDefault();
            onChangeTable({ tags, search });
          }}
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Icon name="Search" className="search-item-input__icon" />}
            placeholder="Nhập nội dung muốn tìm và nhấn enter"
            className="search-item-input"
            error={search?.length > 200 ? true : false}
            message={search?.length > 200 ? "Không được nhập quá 200 kí tự" : null}
          />
        </form>

        <div className="btn-short">
          <Icon name="Sortby" />
        </div>
      </div>
      <div className="tags">
        {tags.map((t, index) => (
          <Tags key={index} onClick={() => setTags(tags.filter((el) => el !== t))}>
            {t.label + " " + t.value}
          </Tags>
        ))}
      </div>
    </div>
  );
};

export default SearchTable;
