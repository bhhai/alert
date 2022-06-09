import React from "react";
import { ISaveSearch } from "src/model/SaveSearchModel";
import "./saveSearch.scss";

interface SaveSearchProps {
  saveSearchList?: ISaveSearch[];
  callback: (saveSearch: ISaveSearch) => void;
}

export default function SaveSearch(props: SaveSearchProps) {
  const { saveSearchList, callback } = props;
  return (
    <ul className="save-search d-flex align-items-center">
      {saveSearchList.map((item, idx) => {
        return (
          <li key={idx} className={item.is_active ? "active" : ""} onClick={() => callback(item)}>
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}
