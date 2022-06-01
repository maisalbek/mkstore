import React from "react";

const HomeBlocks = ({ item, image }) => {
  return (
    <div className="blocks">
      <img className="adventage-image" width="70px" src={image} alt="" />
      <span style={{ fontWeight: "500", lineHeight: "17px" }}>
        {item.title}
      </span>
      <span
        style={{
          color: "#979797",
          lineHeight: "24px",
          marginTop: "10px",
          padding: "0 10px",
        }}
      >
        {item.text}
      </span>
    </div>
  );
};

export default HomeBlocks;
