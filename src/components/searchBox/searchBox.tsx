import React from "react";
import Icon from "../icon";
import Input from "../input/input";
import "./searchBox.scss";

interface SearchBoxProps {
  querySearch: string;
  placeholder: string;
  setQuerySearch: (value: string) => void;
  children?: React.ReactElement;
  className?: string;
}

export default function SearchBox(props: SearchBoxProps) {
  const {className, querySearch, placeholder, setQuerySearch, children } = props;
  return (
    <div className={`search-container d-flex align-items-center ${className} `}>
      <Input
        type="text"
        variant="contained"
        className="search-input"
        placeholder={placeholder}
        icon={<Icon name="Search" />}
        iconPosition="left"
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
      />
      {children}
    </div>
  );
}
