import React, { useEffect, useState } from "react";
import emptyheart from "../images/emptyhearticon.svg";
import heart from "../images/hearticon.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFavorite } from "../context/FavoriteContextProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
const TableCardNovinki = ({ item }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const { addDelToFav, isProdInFav, getFav } = useFavorite();
  const [inFav, setInFav] = React.useState(isProdInFav(item.id));
  const [isActive, setIsActive] = useState({ activeItem: 0 });
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setIsActive({ activeItem: index });
  };

  useEffect(() => {
    getFav();
  }, []);
  return (
    <div style={{ width: "250px", display: "flex", justifyContent: "center" }}>
      <Card
        key={item.id}
        sx={{
          maxWidth: 250,
          height: 440,
          padding: "0",
        }}
      >
        <div className="collectioncard-image-container">
          <img
            width="250px"
            height="322px"
            src={item.image[currentPhoto]}
            alt=""
          />
          {inFav ? (
            currentUser.isLogged ? (
              <img
                src={heart}
                alt=""
                className="collectionlikeIcon"
                onClick={() => {
                  addDelToFav(item);
                  setInFav(isProdInFav(item.id));
                }}
              />
            ) : (
              <img
                src={emptyheart}
                alt=""
                className="collectionlikeIcon"
                onClick={() => {
                  addDelToFav(item);
                  setInFav(isProdInFav(item.id));
                }}
              />
            )
          ) : (
            <img
              src={emptyheart}
              alt=""
              className="collectionlikeIcon"
              onClick={() => {
                addDelToFav(item);
                setInFav(isProdInFav(item.id));
              }}
            />
          )}
          <div
            className="hover-image hover1"
            onMouseEnter={() => {
              setCurrentPhoto(0);
              setIsActive({ activeItem: 0 });
            }}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
          >
            <div className="hover-line line1"></div>
          </div>
          <div
            className="hover-image hover2"
            onMouseEnter={() => {
              setCurrentPhoto(1);
              setIsActive({ activeItem: 1 });
            }}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
          >
            <div className="hover-line line2"></div>
          </div>
          <div
            className="hover-image hover3"
            onMouseEnter={() => {
              setCurrentPhoto(2);
              setIsActive({ activeItem: 2 });
            }}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
          >
            <div className="hover-line line3"></div>
          </div>
          <div
            className="hover-image hover4"
            onMouseEnter={() => {
              setCurrentPhoto(2);
              setIsActive({ activeItem: 2 });
            }}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
          >
            <div className="hover-line line4"></div>
          </div>
          {item.discount > 0 ? (
            <div className="collectionarrow-right">
              <span
                style={{
                  paddingTop: "20px",
                  paddingLeft: "5px",
                  color: "#ffffff",
                }}
              >
                {`${item.oldprice && (item.price * 100) / item.oldprice}%`}
              </span>
            </div>
          ) : null}
        </div>
        <CardContent sx={{ backgroundColor: "#f2f2f2" }} id="tablenovinkicard">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#f2f2f2",
            }}
          >
            <span className="collectionfont">
              <span
                style={{
                  color: "#7c7c7c",
                  textDecoration: "line-through",
                  fontWeight: "300",
                  marginRight: "7px",
                }}
              >
                {item.oldprice.toLocaleString().replace(",", " ")}{" "}
                <span className="collectionfont">р</span>
              </span>
              {item.price.toLocaleString().replace(",", " ")}
              <span style={{ marginLeft: "5px" }} className="collectionfont">
                р
              </span>
            </span>
            <span className="collectionfont-title">{item.title}</span>

            <span className="font-size">Размер: 42-50</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "16px",
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
                        setCurrentPhoto(index);
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

export default TableCardNovinki;
