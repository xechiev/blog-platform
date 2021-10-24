import React from "react";

export default function Button(value, color, height, func) {
  const buttonStyle = {
    boxSizing: "border-box",
    height: `${height}px`,
    padding: "3px 17px 5px 17px",
    border: `1px solid #${color}`,
    borderRadius: "5px",
    alignItems: "center",
    marginRight: "14px",
    color: `#${color}`,
    "& a:hover": {
      backgroundColor: `#${color}`,
      color: "#ffffff",
    },
  };
  return (
    <button type="button" style={buttonStyle} onClick={func}>
      {value}
    </button>
  );
}
