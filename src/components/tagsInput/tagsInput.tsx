import { ITag } from "model/OtherModel";
import React, { useState, useRef } from "react";
import "./tagsInput.scss";

interface TagsInputProps {
  tagsData: string[];
  addTag: any;
  removeTag: any;
  placeholder?: string;
  acceptPaste: boolean;
  maxLength: number;
  label?: string;
}

export default function TagsInput(props: TagsInputProps) {
  const { tagsData, label, addTag, removeTag, placeholder, acceptPaste, maxLength } = props;
  const [errorShow, setErrorShow] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<any>("");

  //const validateRegex = /^[A-Za-z0-9]*$/;
  const addTagData = (e) => {
    e.preventDefault();
    if (e.target.value.trim() !== "" && e.target.value.trim()) {
      if (!tagsData?.some((tag) => tag === e.target.value.trim())) {
        addTag([...tagsData, e.target.value.trim()]);
      }
      e.target.value = "";
      setErrorShow(false);
    } else if (e.target.value.trim() !== "" && !e.target.value.trim()) {
      setErrorShow(true);
    }
  };

  const onPasteTag = (e) => {
    e.preventDefault();
    if (e.clipboardData.getData("Text").trim() !== "") {
      const listTag = e.clipboardData
        .getData("Text")
        .split(",")
        .map((d) => d.trim());
      if (listTag.length > 0) {
        const listValid = [];
        for (let i = 0; i < listTag.length; i++) {
          if (!tagsData.some((tag) => tag === listTag[i]) && listTag[i]) {
            listValid.push(listTag[i]);
          }
        }
        const newListTag = Array.from(new Set([...listValid, ...tagsData]));
        addTag(newListTag);
      }
    }
  };

  const onRemoveTag = (index) => {
    removeTag([...tagsData.filter((elem, i) => i !== index)]);
  };

  const inputRef = useRef(null);
  const focusToInput = () => {
    if (inputRef) {
      inputRef.current.focus();
    }
  };

  const onKeyDown = (e) => {
    if (e.target.value === "" && e.keyCode === 8) {
      const tagsDataAfter = tagsData.splice(0, tagsData.length - 1);
      removeTag(tagsDataAfter);
    }
    if (e.keyCode === 9 || e.keyCode === 188 || e.keyCode === 13) {
      e.preventDefault();
      addTagData(e);
    }
    setValueInput(e.target.value);
  };

  return (
    <div className="react-tag-input" onClick={() => focusToInput()}>
      {label ? <span className="label-text">{label}</span> : ""}
      <div className={`react-tag-input__container${focusInput ? " on-focused" : ""}`}>
        <div className="react-tag-input__list">
          {tagsData?.map((tag, index) => (
            <span key={index} className={`react-tag-input__item animate__animated animate__pulse`}>
              <span>{tag}</span>
              <span
                className="react-tag-input__remove"
                onClick={() => {
                  onRemoveTag(index);
                }}
              >
                &times;
              </span>
            </span>
          ))}
          <input
            type="text"
            placeholder={placeholder}
            onPaste={acceptPaste ? onPasteTag : null}
            className="react-tag-input__input"
            disabled={tagsData?.length === maxLength}
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
            ref={inputRef}
            onKeyDown={(e) => onKeyDown(e)}
          />
        </div>
      </div>
      {errorShow ? <span className="message-error">Tags chỉ bao gồm từ a-z, A-Z, 0-9</span> : ""}
    </div>
  );
}
