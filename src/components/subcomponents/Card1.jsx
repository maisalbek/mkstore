import React, { useState } from "react";
import q1 from "../images/Rectangle 338.svg";
import q2 from "../images/Rectangle 340.svg";
import q3 from "../images/Rectangle 341.svg";
import q4 from "../images/Rectangle 364.svg";
import q5 from "../images/Rectangle 366.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Card1 = ({ item, idForEdit }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  return (
    <div style={{ width: "320px", display: "flex", justifyContent: "center" }}>
      <Card
        key={item.id}
        sx={{
          maxWidth: 320,
          height: 536,
          padding: "0",
        }}
      >
        <div className="card-image-container">
          <img
            width="320px"
            height="437px"
            src={item.image[currentPhoto]}
            alt=""
          />
          <FavoriteBorderIcon className="likeIcon" />
          {/* <div
            className="hover-image hover1"
            onMouseEnter={() => setCurrentPhoto(0)}
            onMouseLeave={() => setCurrentPhoto(0)}
          >
            <div className="hover-line line1"></div>
          </div>
          <div
            className="hover-image hover2"
            onMouseEnter={() => setCurrentPhoto(1)}
            onMouseLeave={() => setCurrentPhoto(0)}
          >
            <div className="hover-line line2"></div>
          </div>
          <div
            className="hover-image hover3"
            onMouseEnter={() => setCurrentPhoto(2)}
            onMouseLeave={() => setCurrentPhoto(0)}
          >
            <div className="hover-line line3"></div>
          </div>
          <div
            className="hover-image hover4"
            onMouseEnter={() => setCurrentPhoto(3)}
            onMouseLeave={() => setCurrentPhoto(0)}
          >
            <div className="hover-line line4"></div>
          </div> */}
          {item.discount > 0 ? (
            <div className="arrow-right">
              <span style={{ paddingTop: "20px", color: "#ffffff" }}>
                {`${item.discount}%`}
              </span>
            </div>
          ) : null}
        </div>
        <CardContent>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#ffffff",
            }}
          >
            <span className="font-title">{item.title}</span>
            <span className="font-price">
              {item.price} <span className="font-price">р</span>
              <span
                style={{
                  marginLeft: "5px",
                  color: "#7c7c7c",
                  textDecoration: "line-through",
                  fontWeight: "300",
                }}
              >
                {item.oldprice > 0 ? item.oldprice : null}
                <span style={{ fontWeight: "300" }}>
                  {item.oldprice > 0 ? "р" : null}
                </span>
              </span>
            </span>
            <span className="font-size">Размер: 42-50</span>
            <div>
              <img
                onClick={() => {
                  idForEdit(item.id);
                }}
                src={q1}
                alt=""
                style={{ marginRight: "12px" }}
              />
              <img
                onClick={() => {
                  idForEdit(item.id);
                }}
                src={q2}
                alt=""
                style={{ marginRight: "12px" }}
              />
              <img
                onClick={() => {
                  idForEdit(item.id);
                }}
                src={q3}
                alt=""
                style={{ marginRight: "12px" }}
              />
              <img
                onClick={() => {
                  idForEdit(item.id);
                }}
                src={q4}
                alt=""
                style={{ marginRight: "12px" }}
              />
              <img
                onClick={() => {
                  idForEdit(item.id);
                }}
                src={q5}
                alt=""
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Card1;
