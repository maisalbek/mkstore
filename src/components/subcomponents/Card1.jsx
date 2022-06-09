import React, { useEffect, useState } from "react";
import emptyheart from "../images/emptyhearticon.svg";
import heart from "../images/hearticon.svg";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContextProvider";

const Card1 = ({ item }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const { addDelToFav, isProdInFav, getFav } = useFavorite();
  const [inFav, setInFav] = React.useState(isProdInFav(item.id));
  const [isActive, setIsActive] = useState({});

  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setIsActive({ activeItem: index });
  };

  useEffect(() => {
    getFav();
  }, []);
  return (
    <div className="cardparent">
      <Card
        key={item.id}
        sx={{
          maxWidth: 320,
          height: 536,
          padding: "0",
          border: "none",
          borderRadius: "0",
        }}
      >
        <div className="card-image-container imageon320">
          <img
            className="imageon320 imgcursor"
            width="320px"
            height="437px"
            src={item.image[currentPhoto]}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
            alt=""
          />
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
          {item.oldprice > 0 ? (
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
            <div style={{ display: "flex", marginTop: "10px" }}>
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

export default Card1;
