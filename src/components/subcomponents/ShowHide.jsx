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
        <span className="question">{item.question}</span>
        {isShown ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      {isShown ? <span className="answer">{item.answer}</span> : null}
    </div>
  );
};

export default ShowHide;
