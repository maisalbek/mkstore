import React, { useState } from "react";

const NewsCard = ({ item }) => {
  const [isShown, setIsShown] = useState(false);
  const toggleText = () => {
    isShown ? setIsShown(false) : setIsShown(true);
  };
  return (
    <div>
      <div className="news-inner-container" key={item.id}>
        <img className="newsImg" src={item.img} alt="" />
        <div className="news-text-container">
          <span
            style={{
              textAlign: "start",
              fontWeight: "500",
              fontSize: "16px",
              marginBottom: "6px",
            }}
          >
            {item.headerText}
          </span>
          <span className="newsTextShown">{item.text}</span>
          <span className="newsTextHided">
            {isShown ? item.text : item.text.substr(0, 200) + ".."}
          </span>
          <button
            className="hide-btn"
            onClick={() => {
              toggleText();
            }}
          >
            {isShown ? "Скрыть" : "Читать полностью"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
