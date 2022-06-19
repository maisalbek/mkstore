import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API } from "../constants/Constants";
import CardNovinki from "../subcomponents/CardNovinki";
import MySkeleton from "../subcomponents/MySkeleton";
import shopIcon from "../images/Icon.svg";
import heartIcon from "../images/heart (2) 1.svg";
import { useProductContext } from "../context/ProductContextProvider";
import "./Details.css";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCardNovinki from "../subcomponents/TableCardNovinki";
import CardTabledet from "../subcomponents/CardTabledet";
import { useFavorite } from "../context/FavoriteContextProvider";
import heart from "../images/whiteheart.svg";
import { useCart } from "../context/CartContextProvider";
import { useAuth } from "../context/AuthContextProvider";

const Details = () => {
  const [novinkiData, setNovinkiData] = useState([]);
  const [prodData, setProdData] = useState({});
  const { typeCollection } = useProductContext();
  const { addDelToFav, getFav, fav, isProdInFav } = useFavorite();
  const [inFav, setInFav] = React.useState(isProdInFav(prodData.id));
  const { prodId } = useParams();
  const { currentUser } = useAuth();
  const { addDelToCart, getCart, cart, isProdInCart } = useCart();
  const navigate = useNavigate();

  const [inCart, setInCart] = React.useState(
    isProdInCart(prodData.id, prodData.color)
  );
  const [isActive, setIsActive] = useState({});

  const handleItemClick = (index, item1) => {
    setIsActive({ activeItem: index });
    let obj = {
      ...prodData,
      color: item1,
    };
    setProdData(obj);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getFav();
    getCart();
    axios.get(`${API}/${prodId}`).then((res) => {
      setProdData(res.data);
      setInFav(isProdInFav(res.data.id));
    });
  }, []);
  useEffect(() => {
    axios.get(`${API}/${prodId}`).then((res) => {
      setProdData(res.data);
      setInFav(isProdInFav(res.data.id));
    });
  }, [prodId]);
  useEffect(() => {
    axios.get(API).then((res) => {
      let newArr = res.data.filter(
        (elem) => elem.discount !== 0 && elem.oldprice !== 0
      );
      setNovinkiData(newArr.splice(0, 5));
    });
  }, []);

  useEffect(() => {
    setInFav(isProdInFav(prodData.id));
    setInCart(isProdInCart(prodData.id, prodData.color));
  }, []);

  useEffect(() => {
    setInFav(isProdInFav(prodData.id));
  }, [fav.products.length]);

  useEffect(() => {
    setInCart(isProdInCart(prodData.id, prodData.color));
  }, [prodData.color]);

  return (
    <div
      style={{
        width: "100%",
        margin: "0 0 70px 0",
      }}
    >
      <div className="collectionOuter detailheading">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span className="breadcrumbs">Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <Link
            to="/collection"
            style={{ textDecoration: "none", color: "#393939" }}
          >
            <span className="breadcrumbs">Колекции</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <Link
            to="/allcollection"
            style={{ textDecoration: "none", color: "#393939" }}
          >
            <span className="breadcrumbs">
              {typeCollection ? typeCollection : prodData.collection}
            </span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span className="breadcrumbs third">{prodData.title}</span>
        </span>
      </div>
      <div style={{ padding: "0 10px" }}>
        <div className="dtablep">
          <TableContainer
            component={Paper}
            style={{ paddingTop: "0", border: "none" }}
          >
            <Table sx={{ minWidth: 262 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {novinkiData && novinkiData.length > 0
                    ? novinkiData.map((item, index) => (
                        <TableCell
                          style={{ padding: "0 5px 0 0 " }}
                          key={index}
                        >
                          <CardTabledet item={item} />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>

        <div className="mobiledetail">
          <span id="titletab">{prodData.title}</span>
          <span id="article">
            Артикул:
            <span id="article2">{prodData.article}</span>
          </span>
          <span id="color">
            Цвет:
            {prodData.colors && prodData.colors.length > 0
              ? prodData.colors.map((item1, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: `${item1}`,
                      marginRight: "15px",
                    }}
                    className={
                      isActive.activeItem === index ? "dotsactive" : ""
                    }
                    onClick={() => {
                      handleItemClick(index, item1);
                    }}
                    // id="colordot"
                    id={item1 !== prodData.color ? null : "colordot"}
                  ></div>
                ))
              : null}
          </span>
          <span id="article" style={{ fontSize: "18px" }}>
            {prodData.price} <span style={{ marginLeft: "3px" }}>р</span>{" "}
            <span
              style={{
                marginLeft: "5px",
                color: "#979797",
                textDecoration: "line-through",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              {prodData.oldprice !== 0 ? prodData.oldprice : null}
              <span style={{ marginLeft: "3px" }}>
                {prodData.oldprice !== 0 ? "р" : null}
              </span>{" "}
            </span>{" "}
          </span>
          <span id="aboutt" style={{ marginBottom: "6px" }}>
            О товаре:
          </span>
          <span id="dettext">{prodData.description}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span className="sizerow">
              Размерный ряд: <span className="sizerowch">42-50</span>
            </span>
            <span className="sizerow">
              Состав ткани:{" "}
              <span className="sizerowch">{prodData.textile} </span>
            </span>
            <span className="sizerow">
              Количество в линейке :{" "}
              <span className="sizerowch">
                {prodData.image && prodData.image.length}
              </span>
            </span>
            <span className="sizerow">
              Материал: <span className="sizerowch">{prodData.material} </span>
            </span>
          </div>

          <div className="btn-container">
            {inCart ? (
              currentUser.isLogged ? (
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    height: "44px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <img src={shopIcon} alt="" style={{ marginRight: "10px" }} />
                  Перейти в корзину
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    height: "44px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    addDelToCart(prodData);
                    setInCart(isProdInCart(prodData.id, prodData.color));
                  }}
                >
                  <img src={shopIcon} alt="" style={{ marginRight: "10px" }} />
                  Добавить в корзину
                </div>
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  height: "44px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addDelToCart(prodData);
                  setInCart(isProdInCart(prodData.id, prodData.color));
                }}
              >
                <img src={shopIcon} alt="" style={{ marginRight: "10px" }} />
                Добавить в корзину
              </div>
            )}

            <div
              style={{
                width: "45px",
                backgroundColor: "black",
                height: "44px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "8px",
              }}
              onClick={() => {
                addDelToFav(prodData);
                setInFav(isProdInFav(prodData.id));
              }}
            >
              {inFav ? (
                currentUser.isLogged ? (
                  <img src={heart} alt="" />
                ) : (
                  <img src={heartIcon} alt="" />
                )
              ) : (
                <img src={heartIcon} alt="" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="detailsOuter-container">
        <div className="details-container">
          {prodData.image && prodData.image.length > 0 ? (
            prodData.image
              .slice(0, 4)
              .map((item, index) => (
                <img
                  id="detailimg"
                  className="detailimg"
                  key={index}
                  src={item}
                  alt=""
                />
              ))
          ) : (
            <MySkeleton />
          )}
        </div>
        <div className="details-rigtht-side">
          <span id="dtitle">{prodData.title}</span>
          <span id="darticle">
            Артикул:
            <span id="darticle2">{prodData.article}</span>
          </span>
          <span id="dcolor">
            Цвет:
            {prodData.colors && prodData.colors.length > 0
              ? prodData.colors.map((item1, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: `${item1}`,
                      marginRight: "15px",
                    }}
                    className={
                      isActive.activeItem === index ? "dotsactive" : ""
                    }
                    onClick={() => {
                      handleItemClick(index, item1);
                    }}
                    id={item1 !== prodData.color ? null : "colordot"}
                  ></div>
                ))
              : null}
          </span>
          <span id="dprice">
            {prodData.price}{" "}
            <span
              style={{
                marginBottom: "17px",
                fontWeight: "600",
                fontSize: "24px",
                color: "#1D1D1B",
              }}
            >
              р
            </span>{" "}
            <span
              style={{
                marginBottom: "17px",
                fontWeight: "500",
                fontSize: "16px",
                color: "#979797",
                textDecoration: "line-through",
              }}
            >
              {prodData.oldprice !== 0 ? prodData.oldprice : null}
              <span
                style={{
                  marginBottom: "17px",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#979797",
                }}
              >
                {prodData.oldprice !== 0 ? "р" : null}
              </span>{" "}
            </span>{" "}
          </span>
          <span
            style={{
              marginBottom: "6px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#1D1D1B",
            }}
          >
            О товаре:
          </span>
          <span id="description">{prodData.description}</span>
          <div className="itemsfourparent">
            <span id="itemsfour">
              Размерный ряд: <span id="itemsfourelem">42-50</span>
            </span>
            <span id="itemsfour">
              Состав ткани: <span id="itemsfourelem">{prodData.textile} </span>
            </span>
            <span id="itemsfour">
              Количество в линейке :{" "}
              <span id="itemsfourelem">
                {prodData.image && prodData.image.length}
              </span>
            </span>
            <span id="itemsfour">
              Материал: <span id="itemsfourelem">{prodData.material} </span>
            </span>
          </div>

          <div className="btn-container">
            {inCart ? (
              currentUser.isLogged ? (
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    height: "44px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <img src={shopIcon} alt="" style={{ marginRight: "10px" }} />
                  Перейти в корзину
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    height: "44px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    addDelToCart(prodData);
                    setInCart(isProdInCart(prodData.id, prodData.color));
                  }}
                >
                  <img src={shopIcon} alt="" style={{ marginRight: "10px" }} />
                  Добавить в корзину
                </div>
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  height: "44px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addDelToCart(prodData);
                  setInCart(isProdInCart(prodData.id, prodData.color));
                }}
              >
                <img src={shopIcon} alt="" style={{ marginRight: "10px" }} />
                Добавить в корзину
              </div>
            )}

            <div
              style={{
                width: "45px",
                backgroundColor: "black",
                height: "44px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "8px",
              }}
              onClick={() => {
                addDelToFav(prodData);
                setInFav(isProdInFav(prodData.id));
              }}
            >
              {inFav ? (
                currentUser.isLogged ? (
                  <img src={heart} alt="" />
                ) : (
                  <img src={heartIcon} alt="" />
                )
              ) : (
                <img src={heartIcon} alt="" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="details-bottom">
        {prodData.image && prodData.image.length > 0 ? (
          prodData.image
            .slice(0, 4)
            .map((item, index) => (
              <img width="150px" height="220px" key={index} src={item} alt="" />
            ))
        ) : (
          <MySkeleton />
        )}
      </div>

      <div className="headerNovinki">
        <span
          style={{
            color: "#393939",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "24px",
            lineHeight: "29px",
          }}
        >
          Похожие товары
        </span>
      </div>
      <div className="detailnovinki">
        {novinkiData && novinkiData.length > 0 ? (
          novinkiData.map((item) => <CardNovinki key={item.id} item={item} />)
        ) : (
          <MySkeleton />
        )}
      </div>
      <div className="table-allcolcontainer dtablecon">
        <TableContainer
          component={Paper}
          style={{ paddingTop: "0", border: "none" }}
        >
          <Table sx={{ minWidth: 262 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {novinkiData && novinkiData.length > 0
                  ? novinkiData.map((item) => (
                      <TableCell
                        style={{ padding: "0 5px" }}
                        key={item.id / 1.5}
                      >
                        <TableCardNovinki item={item} />
                      </TableCell>
                    ))
                  : null}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Details;
