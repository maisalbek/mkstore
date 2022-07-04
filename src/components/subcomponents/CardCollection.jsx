import React from "react";
import Card from "@mui/material/Card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContextProvider";

const CardCollection = ({ item }) => {
  const navigate = useNavigate();
  const { idForEdit } = useProductContext();
  return (
    <div style={{ width: "320px", display: "flex", justifyContent: "center" }}>
      <Card
        key={item.id}
        sx={{
          maxWidth: 320,
          height: 374,
          padding: "0",
          border: "none",
          borderRadius: "0",
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
            className="collectiontitle2"
            onClick={() => {
              idForEdit(item.collection);
              navigate("/allcollection");
            }}
          ></div>
          <div className="collectiontitle">
            <span className="collectiontext">{item.collection}</span>
          </div>
        </div>

        <button
          style={{ border: "none" }}
          className="collection-btn"
          onClick={() => {
            idForEdit(item.collection);
            navigate("/allcollection");
          }}
        >
          Смотреть все
          <ArrowForwardIosIcon sx={{ marginLeft: "10px" }} />
        </button>
      </Card>
    </div>
  );
};

export default CardCollection;
