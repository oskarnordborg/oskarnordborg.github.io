import React, { useState } from "react";
import "./BoardMembers.css";

const BoardMembers = ({ pageData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!pageData) {
    return null;
  }

  // Get the board keys and reverse them
  const boardKeys = Object.keys(pageData)
    .filter((key) => key.startsWith("name_"))
    .reverse(); // Reverse the keys here

  const slideCount = boardKeys.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentBoardKey = boardKeys[currentIndex];
  const boardNumber = currentBoardKey.split("_")[1];

  const members = [];
  for (let i = 1; i <= 3; i++) {
    const memberKey = `member_${boardNumber}_${i}`;
    const memberImageKey = `member_image_${boardNumber}_${i}`;
    if (pageData[memberKey]) {
      members.push(
        <div key={memberKey} className="member">
          <img
            src={pageData[memberImageKey] || "/profile_placeholder.jpg"}
            alt={pageData[memberKey]}
            className="member-image"
          />
          <p>{pageData[memberKey]}</p>
        </div>
      );
    }
  }

  return (
    <div className="section">
      <h1>Styrelseinfo</h1>
      <div className="carousel">
        <div className="slides">
          <div className="slide" key={currentBoardKey}>
            <h2>{pageData[`year_${boardNumber}`]}</h2>
            <h2>{pageData[currentBoardKey]}</h2>
            {/* <p>{pageData[`description_${boardNumber}`]}</p> */}
            <div
              dangerouslySetInnerHTML={{
                __html:
                  pageData[`description_${boardNumber}`] ||
                  `description_${boardNumber}`,
              }}
            ></div>
            {/* <div>{pageData[`description_${boardNumber}`]}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: `<a href="https://shorturl.at/kib4G">Hockey</a> - Lokalhäng`,
              }}
            ></div> */}
            <div className="members-container">{members}</div>
          </div>
        </div>
      </div>

      <div className="pagination">
        <button className="pagination-button" onClick={prevSlide}>
          {"<"}
        </button>
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              currentIndex === index ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
          >
            {pageData[`year_${boardKeys[index].split("_")[1]}`]}
          </button>
        ))}
        <button className="pagination-button" onClick={nextSlide}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default BoardMembers;
