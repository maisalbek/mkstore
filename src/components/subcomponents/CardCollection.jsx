import React from "react";
import Card from "@mui/material/Card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CardCollection = ({ item }) => {
  return (
    <div style={{ width: "320px", display: "flex", justifyContent: "center" }}>
      <Card
        key={item.id}
        sx={{
          maxWidth: 320,
          height: 374,
          padding: "0",
        }}
      >
        <div style={{ height: "330px", position: "relative" }}>
          <img
            className="card-image"
            width="320px"
            height="100%"
            src={item.image[0]}
            alt=""
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: "4",
              top: "90%",
            }}
          >
            <span style={{ color: "#ffffff" }}>{item.collection}</span>
          </div>
        </div>

        <button style={{ border: "none" }} className="collection-btn">
          Смотреть все
          <ArrowForwardIosIcon sx={{ marginLeft: "10px" }} />
        </button>
      </Card>
    </div>
  );
};

export default CardCollection;
