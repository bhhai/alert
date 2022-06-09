import BoxTable from "components/boxTable/boxTable";
import Icon from "components/icon";
import SearchBox from "components/searchBox/searchBox";
import { PaginationModel } from "model/PaginationModel";
import React from "react";
import "./DataList.scss";

interface DataListProps {
  query: string;
  setQuery: (value: string) => void;
  listTitle: string[];
  items: any[];
  listCheck: any[];
  setListCheck: (any) => void;
  isPagination?: boolean;
  dataPagination?: PaginationModel;
}

export default function DataList(props: DataListProps) {
  const { query, setQuery, listTitle, items, listCheck, setListCheck, isPagination, dataPagination } = props;

  return (
    <div>
      <div className="query__search">
        <SearchBox
          placeholder="Nhập nội dung bạn muốn tìm và nhấn enter"
          querySearch={query}
          setQuerySearch={setQuery}
          className="search-box"
        />
        <button>
          <Icon name="Sortby" />
        </button>
      </div>

      <BoxTable
        className="box-table"
        name="list-project"
        titles={listTitle}
        items={items}
        dataMappingArray={(item) => Object.keys(item).map((key) => [item[key]])}
        isBulkAction={true}
        listIdChecked={listCheck}
        setListIdChecked={(list: number[]) => setListCheck([...list])}
        bulkActionItems={[{ title: "show id", onClick: () => console.log(listCheck) }]}
        isPagination={isPagination}
        dataPagination={dataPagination}
      />
    </div>
  );
}
