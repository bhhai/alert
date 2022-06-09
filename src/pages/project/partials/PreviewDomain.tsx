import Checkbox from "components/checkbox/checkbox";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ProjectService from "services/ProjectService";
import { Spinner } from "reactstrap";

export interface IPreviewProps {
  url: string;
  type?: "youtube" | "tiktok" | "twitter" | "facebook" | "domain";
  set: (value) => void;
  remove: () => void;
  checked?: boolean;
}

export interface IPreviewFacebook {
  id: number;
  display_name: string;
  name: string;
  avatar_link: string;
  follow_count: number;
  uid: string;
  menber_count: number;
  facebook_type: number;
  private: boolean;
  fk: string;
}

export interface IPreviewDomain {
  id: number;
  url: string;
  favicon: string;
  name: string;
}

export interface IPreviewYoutube {
  uuid: string;
  view_count: number;
  subscriber_count: number;
  joined_date: string;
  display_name: string;
  description: string;
  avatar: string;
  country: string;
}

const PreviewDomain = (props: IPreviewProps) => {
  const { url, type, set, remove, checked } = props;
  const [preview, setPreviwe] = useState<any>();
  const { isLoading, isError } = useQuery(
    ["preview", url],
    () => {
      if (type === "facebook") return ProjectService.previewByDomain(url, "previewFacebook");
      if (type === "domain") return ProjectService.previewByDomain(url, "previewNews");
      if (type === "youtube") return ProjectService.previewByDomain(url, "previewYoutube");
      if (type === "tiktok") return ProjectService.previewByDomain(url, "previewTiktok");
    },
    {
      onSuccess: (data) => {
        setPreviwe(data.data);
        //set(data.data);
      },
      retry: 5,
      retryOnMount: false,
    }
  );
  if (isLoading)
    return (
      <div className="preview-spinner">
        <Spinner animation="border" />
      </div>
    );
  if (isError) return <p>error</p>;
  return (
    <div className="preview">
      {preview ? (
        <>
          <Checkbox
          checked={checked}
            className="preview-checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                set(preview);
              } else {
                remove();
              }
            }}
          />
          <div className="preview-img">
            {type === "facebook" ? (
              <img src={preview?.avatar_link} alt="" />
            ) : type === "youtube" ? (
              <img src={preview?.avatar} alt="" />
            ) : (
              <img src={preview?.favicon} alt="" />
            )}
          </div>
          <div className="preview-text">
            {type === "facebook" || type === "youtube" ? (
              <p className="preview-title">{preview?.display_name}</p>
            ) : (
              <p className="preview-title">{preview?.name}</p>
            )}
            {/* <p className="preview-title">{preview?.display_name}</p> */}
            {type === "facebook" ? (
              <span className="preview-count">({preview?.follow_count} người theo dõi)</span>
            ) : (
              <span className="preview-count">({preview?.subscriber_count} người theo dõi)</span>
            )}
          </div>
        </>
      ) : (
        <p className="no-margin">không có kết quả phù hợp</p>
      )}
    </div>
  );
};

export default PreviewDomain;
