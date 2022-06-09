import Button from "components/button/button";
import Icon from "components/icon";
import Input from "components/input/input";
import TagsInput from "components/tagsInput/tagsInput";
import { IKeyModel } from "model/project/ProjectModel";
import React from "react";
import "./Rules.scss";

export interface IRulesProps {
  className?: string;
  rules: IKeyModel[];
  addRule?: () => void;
  removeRule?: (index) => void;
  setRule?: (key, index, value) => void;
}

const Rules = (props: IRulesProps) => {
  const { addRule, rules, setRule, removeRule, className } = props;
  return (
    <div className={`key-item ${className ? className : ""} `}>
      <div className="key-item-header">
        <p>Bộ lọc theo từ khoá</p>
        <Button color="primary" onClick={addRule}>
          Thêm từ khoá
        </Button>
      </div>
      {rules.map((keyItem, keyIndex) => (
        <div key={keyIndex} className="key-item-body">
          <div className="key-item-title">
            <p className="">Bộ từ khoá {keyIndex + 1}</p>
            <span onClick={() => removeRule(keyIndex)}>Xoá bộ từ khoá {keyIndex + 1}</span>
          </div>
          <div className="key-item-content">
            <TagsInput
              tagsData={keyItem.main_keywords}
              addTag={(t) => setRule("main_keywords", keyIndex, t)}
              removeTag={(t) => setRule("main_keywords", keyIndex, t)}
              acceptPaste={false}
              maxLength={10}
              label="Từ khoá chính"
            />
            <TagsInput
              tagsData={keyItem.sub_keywords}
              addTag={(t) => setRule("sub_keywords", keyIndex, t)}
              removeTag={(t) => setRule("sub_keywords", keyIndex, t)}
              acceptPaste={false}
              maxLength={10}
              label="Từ khoá phụ"
            />
            <TagsInput
              tagsData={keyItem.exclude_keywords}
              addTag={(t) => setRule("exclude_keywords", keyIndex, t)}
              removeTag={(t) => setRule("exclude_keywords", keyIndex, t)}
              acceptPaste={false}
              maxLength={10}
              label="Từ khoá ngoại lệ"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rules;
