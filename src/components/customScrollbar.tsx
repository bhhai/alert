import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
interface CustomScrollbarProps {
  children: React.ReactElement;
  className?: string;
  width: string | number;
  height: string | number;
  autoHide?: boolean;
}

export default function CustomScrollbar(props: CustomScrollbarProps) {
  const { children, className, width, height, autoHide } = props;
  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: "#c4c4c4",
      borderRadius: 6,
    };
    return <div {...props} style={{ ...style, ...thumbStyle }} />;
  };
  const renderTrack = ({ ...props }) => {
    return <div {...props} className="track-vertical" />;
  };
  return (
    <Scrollbars
      style={{ width: width, height: height }}
      renderTrackVertical={renderTrack}
      renderThumbVertical={renderThumb}
      className={`custom-scrollbar${className ? ` ${className}` : ""}`}
      autoHide={autoHide ? true : false}
    >
      {children}
    </Scrollbars>
  );
}
