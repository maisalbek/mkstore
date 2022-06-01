import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const ShowHide = ({ item }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleIsShown = () => {
    isShown ? setIsShown(false) : setIsShown(true);
  };
  return (
    <div
      className="parentDiv"
      onClick={() => {
        toggleIsShown();
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "20px",
            color: "black",
          }}
        >
          {item.question}
        </span>
        {isShown ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      {isShown ? (
        <span
          style={{
            textAlign: "start",
            marginTop: "10px",
            color: "#354455",
            fontWeight: "200",
            lineHeight: "160%",
            fontSize: "14px",
          }}
        >
          {item.answer}
        </span>
      ) : null}
    </div>
  );
};

export default ShowHide;
