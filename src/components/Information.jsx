import React from "react";
import "./Information.css";

const Information = ({ pageData }) => {
  if (!pageData) {
    return null;
  }
  return (
    <div className="section">
      <h1>{pageData.info_header || "info.info_header"}</h1>
      <p>{pageData.info_text || "info.info_text"}</p>
    </div>
  );
};

export default Information;
