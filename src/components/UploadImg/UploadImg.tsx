import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import "./uploadimg.scss";
import UploadService from "services/UploadService";

export interface IUploadImgModel {
  className?: string;
}

export const UploadImg = (props: IUploadImgModel) => {
  const { className } = props;
  const [selectedFile, setSelectedFile] = useState<any>();
  const mutation = useMutation(
    (file) => {
      return UploadService.uploadImage(file);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <div className={`base-uploadimg ${className ? className : ""}`}>
      <div className="uploadimg--inner">
        <label htmlFor="uploadImg">
          {selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} />
          ) : (
            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34.7913 34.7916V60.5416H26.208V34.7916H0.458008V26.2083H26.208V0.458252H34.7913V26.2083H60.5413V34.7916H34.7913Z"
                fill="#C4C4C4"
              />
            </svg>
          )}
        </label>
        <input
          id="uploadImg"
          type="file"
          onChange={async (e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
              let formData: any = new FormData();
              formData.append("files", e.target.files[0]);
              mutation.mutate(formData)
            }
          }}
        />
      </div>
    </div>
  );
};
