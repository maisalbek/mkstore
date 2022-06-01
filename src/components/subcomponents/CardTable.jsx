import React from "react";
import q1 from "../images/Rectangle 338.svg";
import q2 from "../images/Rectangle 340.svg";
import q3 from "../images/Rectangle 341.svg";
import q4 from "../images/Rectangle 364.svg";
import q5 from "../images/Rectangle 366.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CardTable = ({ item, idForEdit, type }) => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        key={item.id}
        sx={{
          maxWidth: 262,
          height: 472,
          padding: "0",
        }}
      >
        <div className="cardTable-image-container">
          <img width="262px" height="373px" src={item.image[0]} alt="" />
          {/* <Swiper className="mySwiper">
            <SwiperSlide style={{ position: "relative" }}>
              <img width="262px" height="373px" src={item.image[0]} alt="" />
              <div className="thover-line tline1"></div>
            </SwiperSlide>
            <SwiperSlide>
              <img width="262px" height="373px" src={item.image[1]} alt="" />
              <div className="thover-line tline2"></div>
            </SwiperSlide>
            <SwiperSlide>
              <img width="262px" height="373px" src={item.image[2]} alt="" />
              <div className="thover-line tline3"></div>
            </SwiperSlide>
            <SwiperSlide>
              <img width="262px" height="373px" src={item.image[3]} alt="" />
              <div className="thover-line tline4"></div>
            </SwiperSlide>
          </Swiper> */}
          <FavoriteBorderIcon className="likeIcon" />
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

export default CardTable;
