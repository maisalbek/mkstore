import React, { useEffect, useState } from "react";
import emptyheart from "../images/emptyhearticon.svg";
import heart from "../images/hearticon.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useFavorite } from "../context/FavoriteContextProvider";
import { useNavigate } from "react-router-dom";

const CardTable = ({ item }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const { addDelToFav, isProdInFav, getFav } = useFavorite();
  const [inFav, setInFav] = React.useState(isProdInFav(item.id));
  const [isActive, setIsActive] = useState({});
  const handleItemClick = (index) => {
    setIsActive({ activeItem: index });
  };
  const navigate = useNavigate();

  useEffect(() => {
    getFav();
  }, []);
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          maxWidth: 262,
          height: 472,
          padding: "0",
          border: "none",
          borderRadius: "0",
        }}
      >
        <div className="cardTable-image-container">
          {/* <img
            width="262px"
            height="373px"
            src={item.image[currentPhoto]}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
            alt=""
          /> */}
          <Swiper
            className="mySwiper"
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
          >
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
          </Swiper>
          {inFav ? (
            <img
              src={heart}
              alt=""
              className="likeIcon"
              onClick={() => {
                addDelToFav(item);
                setInFav(isProdInFav(item.id));
              }}
            />
          ) : (
            <img
              src={emptyheart}
              alt=""
              className="likeIcon"
              onClick={() => {
                addDelToFav(item);
                setInFav(isProdInFav(item.id));
              }}
            />
          )}
          {item.discount > 0 ? (
            <div className="arrow-right">
              <span style={{ paddingTop: "20px", color: "#ffffff" }}>
                {`${item.oldprice && (item.price * 100) / item.oldprice}%`}
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
            <span className="fp">
              {item.price.toLocaleString().replace(",", " ")}{" "}
              <span className="fp">р</span>
              <span
                style={{
                  marginLeft: "5px",
                  color: "#7c7c7c",
                  textDecoration: "line-through",
                  fontWeight: "300",
                }}
              >
                {item.oldprice > 0
                  ? item.oldprice.toLocaleString().replace(",", " ")
                  : null}
                <span style={{ fontWeight: "300" }}>
                  {item.oldprice > 0 ? "р" : null}
                </span>
              </span>
            </span>
            <span className="fs">Размер: 42-50</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2px",
              }}
            >
              {item.colors && item.colors.length > 0
                ? item.colors.map((item1, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: `${item1}`,
                        marginRight: "15px",
                        marginLeft: "0",
                      }}
                      className={
                        isActive.activeItem === index ? "dotsactive" : ""
                      }
                      onClick={() => {
                        handleItemClick(index);
                        setCurrentPhoto((prev) => {
                          if (prev === 4) {
                            return prev - 1;
                          } else {
                            return prev + 1;
                          }
                        });
                      }}
                      id="colordots"
                    ></div>
                  ))
                : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardTable;
